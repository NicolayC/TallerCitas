import { Appointment } from './model'
import { Request, Response } from 'express'
import { AppointmentService } from './service'
import logger from '../../../utils/logger'
import { DoctorCreationError, DoctorDeleteError, DoctorGetAllError, DoctorUpdateError,RecordNotFoundError} from '../../../config/customErrors'

export interface AppointmentController {
    getAllAppointments(req: Request, res: Response): void
    createAppointment(req: Request, res: Response): void
    getAppointmentById(req: Request, res: Response): void
    updateAppointment(req: Request, res: Response): void
    deleteAppointment(req: Request, res: Response): void
}

export class AppointmentControllerImpl implements AppointmentController {
    private appointmentService: AppointmentService

    constructor ( appointmentService: AppointmentService ){
        this.appointmentService = appointmentService
    }
    public async getAllAppointments(req: Request, res: Response): Promise<void> {
        try {
            const patients = await this.appointmentService.getAllAppointments()

            res.status(200).json(patients)
            
        } catch (error) {
            logger.error(error)
            res.status(400).json({message: "Error getting all doctors"})
        }
        
    }
    public createAppointment(req: Request, res: Response): void{
        const appointmentReq = req.body
        this.appointmentService.createAppointment(appointmentReq)
        .then(
            (appointment) => {
                res.status(201).json(appointment)
            },
            (error) => {
                logger.error(error)
                if (error instanceof DoctorCreationError){
                    res.status(400).json({
                        error_name: error.name,
                        message: "Failed creating appointmentt"
                    })
                } else {
                    res.status(400).json({
                        message: "Internal Server Error"
                    })
                }
            }
        )   
        
    }
    public async getAppointmentById (req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)
            const patient = await this.appointmentService.getAppointmentById(id)
            if (patient) {
                res.status(200).json(patient)
            } else {
                throw new RecordNotFoundError()
            }
        } catch (error) {
            logger.error(error)
            if (error instanceof RecordNotFoundError){
                res.status(400).json({error: error.message})
            } else if(error instanceof RecordNotFoundError){
                res.status(400).json({error: error.message})
            } else{
                res.status(400).json({error: "Failed to update appointment"})
            }
        }
    }
    public async updateAppointment (req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)
            const appointmentReq = req.body
            const appointment = await this.appointmentService.updateAppointment(id, appointmentReq)
            if (appointment) {
                res.status(200).json(appointment)
            } else {
                throw new RecordNotFoundError()
            }
        } catch (error) {
            logger.error(error)
            if (error instanceof RecordNotFoundError){
                res.status(400).json({error: error.message})
            } else {
                res.status(400).json({error: "Failed to update appointment"})
            }
        }
    }
    public async deleteAppointment (req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)
            const patient = await this.appointmentService.getAppointmentById(id)
            if (patient) {
                res.status(200).json(patient)
            } else {
                throw new RecordNotFoundError()
            }
        } catch (error) {
            logger.error(error)
            if (error instanceof RecordNotFoundError){
                res.status(400).json({error: error.message})
            } else {
                res.status(400).json({error: "Failed to delete appointment"})
            }
        }
    }
    
}
