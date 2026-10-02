import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, disconnectDB } from '../db.js';
import { Job } from '../models/Job.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

// Lightweight .env loader if run directly with Node
function loadEnvFile() {
  const envPath = path.resolve(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const equalsIdx = trimmed.indexOf('=');
      if (equalsIdx !== -1) {
        const key = trimmed.substring(0, equalsIdx).trim();
        let val = trimmed.substring(equalsIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

export async function migrateJobs() {
  loadEnvFile();

  const jobsFilePath = path.resolve(rootDir, 'data/jobs.json');
  console.log('----------------------------------------------------');
  console.log('Aegis Job Migration Script: JSON -> MongoDB');
  console.log('----------------------------------------------------');

  if (!fs.existsSync(jobsFilePath)) {
    console.error(`[Error] data/jobs.json not found at: ${jobsFilePath}`);
    return { success: false, error: 'Source data/jobs.json not found' };
  }

  let rawJobs = [];
  try {
    const fileContent = fs.readFileSync(jobsFilePath, 'utf8');
    rawJobs = JSON.parse(fileContent);
    if (!Array.isArray(rawJobs)) {
      throw new Error('jobs.json does not contain an array of jobs');
    }
  } catch (err) {
    console.error(`[Error] Failed to read or parse data/jobs.json: ${err.message}`);
    return { success: false, error: err.message };
  }

  console.log(`[Source] Found ${rawJobs.length} records in data/jobs.json`);

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[Error] MONGODB_URI is not set in environment or .env file.');
    console.error('Please add MONGODB_URI=<your_mongodb_connection_string> in .env before running migration.');
    return { success: false, error: 'MONGODB_URI missing' };
  }

  try {
    await connectDB(uri);
  } catch (err) {
    console.error(`[Database Error] Could not connect to MongoDB: ${err.message}`);
    return { success: false, error: err.message };
  }

  let insertedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const rawJob of rawJobs) {
    try {
      // Validate required fields
      if (!rawJob.title || !rawJob.department || !rawJob.location || !rawJob.description) {
        console.warn(`[Validation Warning] Skipping invalid record: ${JSON.stringify(rawJob)}`);
        skippedCount++;
        continue;
      }

      const legacyId = rawJob.id || null;
      const jobPayload = {
        legacyId: legacyId,
        title: String(rawJob.title).trim(),
        department: String(rawJob.department).trim(),
        location: String(rawJob.location).trim(),
        employmentType: String(rawJob.employmentType || 'Full-Time').trim(),
        description: String(rawJob.description).trim(),
        requirements: rawJob.requirements || '',
        postedDate: rawJob.postedDate || new Date().toISOString().split('T')[0],
        isActive: rawJob.isActive !== false,
      };

      // Idempotency: Check if record exists by legacyId OR title + department
      let existingJob = null;
      if (legacyId) {
        existingJob = await Job.findOne({ legacyId });
      }
      if (!existingJob) {
        existingJob = await Job.findOne({ title: jobPayload.title, department: jobPayload.department });
      }

      if (existingJob) {
        // Safe update existing record without duplicates
        await Job.updateOne({ _id: existingJob._id }, { $set: jobPayload });
        updatedCount++;
        console.log(`  ✓ Updated existing record: "${jobPayload.title}" (${existingJob._id})`);
      } else {
        // Insert new record
        const created = await Job.create(jobPayload);
        insertedCount++;
        console.log(`  + Inserted new record: "${jobPayload.title}" (${created._id})`);
      }
    } catch (itemErr) {
      console.error(`[Record Error] Failed processing "${rawJob.title}": ${itemErr.message}`);
      errorCount++;
    }
  }

  console.log('----------------------------------------------------');
  console.log('Migration Summary:');
  console.log(`- Total records inspected: ${rawJobs.length}`);
  console.log(`- Inserted new:            ${insertedCount}`);
  console.log(`- Updated existing:        ${updatedCount}`);
  console.log(`- Skipped (invalid):       ${skippedCount}`);
  console.log(`- Errors:                  ${errorCount}`);
  console.log('----------------------------------------------------');
  console.log('Note: data/jobs.json has been preserved and was NOT modified or deleted.');

  await disconnectDB();
  return {
    success: errorCount === 0,
    total: rawJobs.length,
    inserted: insertedCount,
    updated: updatedCount,
    skipped: skippedCount,
    errors: errorCount,
  };
}

// Auto-run if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  migrateJobs()
    .then((result) => {
      process.exit(result.success ? 0 : 1);
    })
    .catch((err) => {
      console.error('Fatal migration error:', err);
      process.exit(1);
    });
}
