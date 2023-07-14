import { Request, Response } from "express"
import { AppointmentController, AppointmentControllerImpl } from "../api/components/citas/controller"
import { AppointmentService } from "../api/components/citas/service"
import { Appointment, AppointmentReq } from "../api/components/citas/model"

const mockReq = {} as Request
const mockRes = {} as Response

// Test Total AppointmentController
describe('AppointmentController', () => {
    let appointmentService: AppointmentService
    let appointmentController: AppointmentController

    beforeEach( () => {
        appointmentService = {
            getAllAppointments: jest.fn(),
            createAppointment: jest.fn(),
            getAppointmentById: jest.fn(),
            updateAppointment: jest.fn(),
            deleteAppointment: jest.fn()
        }
        appointmentController = new AppointmentControllerImpl(appointmentService)
        mockRes.status = jest.fn().mockReturnThis()
        mockRes.json = jest.fn().mockReturnThis()
    })
    // Test getAllAppointments
    describe ('getAllAppointments', () => {

        it('should get all appointments',async () => {

            // Mock process
            const apointments: Appointment[] = [  
                {identificacion_paciente: '1', especialidad: 'Cardiología', doctor: 'Cáceres', consultorio: 15, horario: '7PM'},
                {identificacion_paciente: '2', especialidad: 'Oftalmología', doctor: 'Castellanos', consultorio: 14, horario: '10AM'},
            ];

            (appointmentService.getAllAppointments as jest.Mock).mockResolvedValue(apointments)

            // Method execution
            await appointmentController.getAllAppointments(mockReq, mockRes)

            // Asserts
            expect(appointmentService.getAllAppointments).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith(apointments)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should be handler error and return 400 status',async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (appointmentService.getAllAppointments as jest.Mock).mockRejectedValue(error)

            // Method execution
            await appointmentController.getAllAppointments(mockReq, mockRes)

            // Asserts
            expect(appointmentService.getAllAppointments).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith({message: "Error getting all doctors"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })
    // Test createAppointment
    describe ('createAppointment', () => {

        it('should create a new appointment and return info',async () => {       

            // Mock process
            const appointmentRes: Appointment = {identificacion_paciente: '1', especialidad: 'Cardiología', doctor: 'Cáceres', consultorio: 15, horario: '7PM'};
            const appointmentReq: AppointmentReq = {identificacion_paciente: 'Pepito', especialidad: 'Cardiología', id_doctor: 15, horario: '7PM'};
            
            (mockReq.body as AppointmentReq) = appointmentReq;
            (appointmentService.createAppointment as jest.Mock).mockResolvedValue(appointmentRes)

            // Method execution
            await appointmentController.createAppointment(mockReq, mockRes)

            // Asserts
            expect(appointmentService.createAppointment).toHaveBeenCalledWith(appointmentReq)
            expect(mockRes.json).toHaveBeenCalledWith(appointmentRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should be handler error and return 400 status', async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (mockReq.body) = {};
            (appointmentService.createAppointment as jest.Mock).mockRejectedValue(error)
            
            // Method execution
            await appointmentController.createAppointment(mockReq, mockRes)

            // Asserts
            expect(appointmentService.createAppointment).toHaveBeenCalledWith()
            expect(mockRes.json).toHaveBeenCalledWith({message: "Internal Server Error"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })
    // Test getAppointmentById
    describe ('getAppointmentById', () => {

        it('should get appointment by id', async () => {   

            // Mock process
            const doctorRes: Appointment = {identificacion_paciente: '1', especialidad: 'Cardiología', doctor: 'Cáceres', consultorio: 15, horario: '7PM'};       
            (mockReq.params) = { id: "1"};
            (appointmentService.getAppointmentById as jest.Mock).mockResolvedValue(doctorRes)

            // Method execution
            await appointmentController.getAppointmentById(mockReq, mockRes)

            // Asserts
            expect(appointmentService.getAppointmentById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith(doctorRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should return 400 if appointment no found', async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (mockReq.params) = { id: "1"};
            (appointmentService.getAppointmentById as jest.Mock).mockResolvedValue(null)
            
            // Method execution
            await appointmentController.getAppointmentById(mockReq, mockRes)

            // Asserts
            expect(appointmentService.getAppointmentById).toHaveBeenCalledWith()
            expect(mockRes.json).toHaveBeenCalledWith({message: "Record has no found yet"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })

        it('should return 400 if an error occurs', async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (mockReq.params) = { id: "1"};
            (appointmentService.getAppointmentById as jest.Mock).mockRejectedValue(error)
            
            // Method execution
            await appointmentController.getAppointmentById(mockReq, mockRes)

            // Asserts
            expect(appointmentService.getAppointmentById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to retrieve doctor"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })

})