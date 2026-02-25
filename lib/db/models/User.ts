import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  name?: string;
  email: string;
  state?: string;
  password?: string;
  isVerified: boolean;
  otp?: {
    code: string;
    expiresAt: Date;
  };
  profile?: {
    farmSize?: number;
    soilType?: 'clay' | 'sandy' | 'loamy' | 'black';
    crops?: string[];
    location?: {
      latitude?: number;
      longitude?: number;
      address?: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  generateOTP(): string;
  verifyOTP(otp: string): boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  state: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  profile: {
    farmSize: Number,
    soilType: {
      type: String,
      enum: ['clay', 'sandy', 'loamy', 'black']
    },
    crops: [String],
    location: {
      latitude: Number,
      longitude: Number,
      address: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate OTP method
UserSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  };
  return otp;
};

// Verify OTP method
UserSchema.methods.verifyOTP = function(otp: string) {
  if (!this.otp || !this.otp.code || !this.otp.expiresAt) {
    return false;
  }
  
  if (this.otp.expiresAt < new Date()) {
    return false;
  }
  
  return this.otp.code === otp;
};

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

// Hash password before saving
UserSchema.pre('save', async function() {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Delete the existing model if it exists to avoid caching issues
if (mongoose.models.User) {
  delete mongoose.models.User;
}

export const User = mongoose.model<IUser>('User', UserSchema);
