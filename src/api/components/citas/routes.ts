import { Router, Request, Response } from'express'
import { AppointmentController, AppointmentControllerImpl} from './controller'
import { AppointmentRepository } from './repository'
import { AppointmentServiceImpl } from './service'
import { DoctorRepository } from '../doctores/repository'

const router = Router()
const repository = new AppointmentRepository()
const repositoryDoctor = new DoctorRepository()
const service = new AppointmentServiceImpl(repository, repositoryDoctor)
const controller: AppointmentController = new AppointmentControllerImpl(service)

router.get('', controller.getAllAppointments.bind(controller))
router.post('/create', controller.createAppointment.bind(controller))
router.get('/list', controller.getAllAppointments.bind(controller))

export default router