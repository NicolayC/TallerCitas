import { Router } from 'express'
import doctorRoutes from './components/doctores/routes'
import citasRoutes from './components/citas/routes'
import pacientesRoutes from './components/pacientes/routes'

const router = Router()

router.use('/doctores', doctorRoutes)
router.use('/citas', citasRoutes)
router.use('/pacientes', pacientesRoutes)

//router.use('/citas', citaRoutes)

export default router