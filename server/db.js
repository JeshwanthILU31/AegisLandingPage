import mongoose from 'mongoose';

/**
 * Global cache for MongoDB connection across server restarts / hot reloads
 */
let isConnected = false;

export async function connectDB(uri = process.env.MONGODB_URI) {
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  if (!uri) {
    const errorMsg = 'MONGODB_URI environment variable is not defined. Please configure it in your .env file.';
    console.warn(`[Database Warning] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  try {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    };

    const conn = await mongoose.connect(uri, opts);
    isConnected = true;
    console.log(`[Database] MongoDB connected successfully to host: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    isConnected = false;
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    throw error;
  }
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[Database] MongoDB connection closed');
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

export default { connectDB, disconnectDB, isDbConnected };
