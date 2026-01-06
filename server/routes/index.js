import express from 'express'
import { dashboardRoutes } from './dashboard.js'

const router = express.Router()

router.use('/dashboard', dashboardRoutes)

export default router
