import cron from 'node-cron';
import { generateSampleDataCore } from '../controllers/admin.controller.js';

// Sample data generation function (reuses admin controller logic)
const generateSampleDataCron = async () => {
  try {
    console.log('🕒 Cron Job: Starting sample data generation at', new Date().toISOString());
    
    // Use the existing core logic from admin controller
    await generateSampleDataCore();

    console.log('✅ Cron Job: Sample data generation completed successfully at', new Date().toISOString());
  } catch (error) {
    console.error('❌ Cron Job: Error during sample data generation:', error);
  }
};

// Initialize cron jobs
const initializeCronJobs = () => {
  // Only run cron jobs when explicitly enabled via environment variable
  const shouldRunCron = process.env.ENABLE_CRON === 'true';
  
  if (!shouldRunCron) {
    console.log('🕒 Cron jobs disabled. Set ENABLE_CRON=true to enable.');
    return;
  }

  // Run every 2 days at midnight IST
  // IST is UTC+5:30, so midnight IST (00:00) = 18:30 UTC previous day
  // Cron expression: '30 18 */2 * *' means "At 18:30 UTC every 2nd day"
  // This translates to 00:00 IST (midnight) every 2 days
  // Format: minute hour day-of-month month day-of-week
  // '30 18 */2 * *' = minute:30, hour:18(UTC), every-2nd-day, any-month, any-day-of-week
  const cronSchedule = '30 18 */2 * *';
  
  cron.schedule(cronSchedule, generateSampleDataCron, {
    scheduled: true,
    timezone: 'UTC', // Schedule runs at 18:30 UTC = 00:00 IST next day
  });

  console.log('🕒 Cron job scheduled: Sample data generation every 2 days at midnight IST');
  console.log('🕒 Schedule pattern:', cronSchedule);
};

// Export both the initialization function and the manual generation function
export { initializeCronJobs, generateSampleDataCron };
