import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    legacyId: {
      type: String,
      index: true,
      sparse: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      index: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      index: true,
    },
    employmentType: {
      type: String,
      required: [true, 'Employment type is required'],
      trim: true,
      default: 'Full-Time',
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true,
    },
    requirements: {
      type: mongoose.Schema.Types.Mixed,
      default: '',
    },
    postedDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.legacyId;
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        ret.id = doc._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.legacyId;
        return ret;
      },
    },
  }
);

// Compound indexes for optimized query filtering and sorting
jobSchema.index({ isActive: 1, postedDate: -1 });
jobSchema.index({ isActive: 1, createdAt: -1 });

export const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
export default Job;
