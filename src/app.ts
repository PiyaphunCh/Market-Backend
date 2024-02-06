import express, { Express } from 'express'
import { routes } from './rountes'
import { connect } from 'mongoose'
import cors from 'cors'
import cronJob from '../cronjob' // Assuming your cronjob file exports the cron job

const app: Express = express()
const port: number = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Connect to MongoDB
const mongoURI: string =
  'mongodb://manageadmin:qrmosManageAdmin1234!@165.22.243.246:27017/manage'
connect(mongoURI)
  .then(() => {
    console.log('MongoDB Connected...')

    // Start the cron job
    cronJob.start()
    console.log('Cron job started...')

    // Set up routes
    app.use('/api', routes)

    // Start the server
    app.listen(port, () => {
      console.log(`Application is running on port ${port}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

export default app
