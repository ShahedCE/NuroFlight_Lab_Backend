/**
 * Admin seed script
 * This script creates the first admin user in the database.
 */

import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Admin } from '../src/database/entities/admin.entity';

// Load environment variables
dotenv.config();

/**
 * TypeORM DataSource configuration
 */
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Admin],
});

/**
 * Function to create admin
 */
async function createAdmin() {
  await AppDataSource.initialize();

  const adminRepository = AppDataSource.getRepository(Admin);

  const email = 'shahedjaman762@gmail.com';
  const password = 'admin123';

  // Check if admin already exists
  const existingAdmin = await adminRepository.findOne({
    where: { email },
  });

  if (existingAdmin) {
    console.log('Admin already exists');
    process.exit();
  }

  /**
   * Hash password using bcrypt
   */
  const hashedPassword = await bcrypt.hash(password, 10);  //salt=10

  /**
   * Create admin entity
   */
  const admin = adminRepository.create({
    email,
    password: hashedPassword,
  });

  await adminRepository.save(admin);

  console.log('Admin created successfully');
  console.log('Email:', email);
  console.log('Password:', password);

  process.exit();
}

createAdmin();