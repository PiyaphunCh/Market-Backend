import axios from 'axios'
import { CronJob } from 'cron'

// Define your cron job function
const myCronJob = async () => {
  await axios.post('http://localhost:3000/api/get/market', { type: 'all' })
}

// Create a cron job
const job = new CronJob('5 * * * * *', myCronJob) // Runs every second

// Start the cron job
job.start()

console.log('Cron job scheduled.')

export default job
