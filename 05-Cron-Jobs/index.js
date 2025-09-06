import express from "express";
import cron from "node-cron";

const app = express();

// Seconds Minutes Hours DayOfMonth Month DayOfWeek
// * * * * * *

// Every 5 seconds
cron.schedule("*/5 * * * * *", () => {
  console.log("Task is running every 5 seconds");
});

// 1. Every minute
cron.schedule("* * * * *", () => {
  console.log("Task runs every minute");
});

// 2. Every hour at minute 0
cron.schedule("0 * * * *", () => {
  console.log("Task runs at the start of every hour");
});

// 3. Every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Task runs every day at midnight");
});

// 4. Every Monday at 9:00 AM
cron.schedule("0 9 * * 1", () => {
  console.log("Task runs every Monday at 9:00 AM");
});

// 5. Every 15 minutes
cron.schedule("*/15 * * * *", () => {
  console.log("Task runs every 15 minutes");
});

// 6. Every weekday at 6:30 PM
cron.schedule("30 18 * * 1-5", () => {
  console.log("Task runs at 6:30 PM on weekdays");
});

// 7. On the 1st of every month at 8:00 AM
cron.schedule("0 8 1 * *", () => {
  console.log("Task runs on the 1st of every month at 8:00 AM");
});

// 8. Every Sunday at 10:00 AM
cron.schedule("0 10 * * 0", () => {
  console.log("Task runs every Sunday at 10:00 AM");
});

// 9. Every 10 seconds
cron.schedule("*/10 * * * * *", () => {
  console.log("Task runs every 10 seconds");
});

// 10. Every 5th, 10th, and 15th day of the month at noon
cron.schedule("0 12 5,10,15 * *", () => {
  console.log("Task runs on the 5th, 10th, and 15th of the month at noon");
});

app.listen(5050, () => {
  console.log("Server is running on port 5050");
});
