import mongoose from 'mongoose';
import User from './models/User.js';

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/royal-business-machine');
  
  // 1. Admin
  let admin = await User.findOne({ email: 'admin.qa@royalbusinessmachine.com' });
  if (admin) {
    admin.isVerified = true;
    admin.role = 'admin';
    await admin.save();
    console.log('✓ Admin user verified and role set to admin');
  }

  // 2. Client
  let client = await User.findOne({ email: 'client.qa@royalbusinessmachine.com' });
  if (!client) {
    client = new User({
      name: 'Verified Client',
      email: 'client.qa@royalbusinessmachine.com',
      phone: '9057287689',
      password: 'Password@123',
      role: 'client',
      isVerified: true
    });
    await client.save();
    console.log('✓ Created verified client user');
  } else {
    client.isVerified = true;
    await client.save();
    console.log('✓ Client user verified');
  }

  await mongoose.disconnect();
}

seed().catch(console.error);
