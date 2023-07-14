
import { Appointment, AppointmentReq } from "../api/components/citas/model"
//import { Doctor, DoctorReq } from "../api/components/doctores/model"


import { AppointmentServiceImpl } from "../api/components/citas/service"
//import { DoctorServiceImpl } from "../api/components/doctores/service"

import { AppointmentRepository } from "../api/components/citas/repository"
import { DoctorRepository } from "../api/components/doctores/repository"
//import { DoctorRepository } from "../api/components/doctores/repository"
//import { DoctorRepository } from "../api/components/doctores/repository"

// Test Total AppointmentService
describe('AppointmentService', () => {
    let appointmentService: AppointmentServiceImpl
    let appointmentRepository: AppointmentRepository

    beforeEach( () => {
        appointmentRepository = {
            getAllAppointments: jest.fn(),
            createAppointment: jest.fn(),
            getAppointmentById: jest.fn(),
            updateAppointment: jest.fn(),
            deleteAppointment: jest.fn()
        }
        appointmentService = new AppointmentServiceImpl(appointmentRepository)
    })
    // Test getAllAppointments
    describe ('getAllAppointments', () => {
        it('should get all appointments from service', async () => {

            // Mock process
            const appointments: Appointment[] = [
                {identificacion_paciente: '1', especialidad: 'Cardiología', doctor: 'Cáceres', consultorio: 15, horario: '7PM'},
                {identificacion_paciente: '2', especialidad: 'Oftalmología', doctor: 'Castellanos', consultorio: 14, horario: '10AM'},
            ];
            (appointmentRepository.getAllAppointments as jest.Mock).mockResolvedValue(appointments)

            // Method execution
            const result = await appointmentService.getAllAppointments()

            // Asserts
            expect(appointmentRepository.getAllAppointments).toHaveBeenCalled()
            expect(result).toEqual(appointments)           
        })
        it('should return an empty array when no appointments are found', async () => {
            
            // Mock process
            (appointmentRepository.getAllAppointments as jest.Mock).mockResolvedValue([])

            // Method execution
            const result = await appointmentService.getAllAppointments()

            // Asserts
            expect(appointmentRepository.getAllAppointments).toHaveBeenCalled()
            expect(result).toEqual([])
        })
    })
    // Test createAppointment
    describe ('createAppointment', () => {
        it('should create a new appointments and return it from service', async () => {
            
            // Mock process
            const appointmentRes: Appointment = {identificacion_paciente: '2', especialidad: 'Oftalmología', doctor: 'Castellanos', consultorio: 14, horario: '10AM'};
            const appointmentReq: AppointmentReq = {identificacion_paciente: 'Pepito', especialidad: 'Cardiología', id_doctor: 15, horario: '7PM'};

            (appointmentRepository.createAppointment as jest.Mock).mockResolvedValue(appointmentRes)

            // Method execution
            const result = await appointmentService.createAppointment(appointmentReq)

            // Asserts
            expect(appointmentRepository.createAppointment).toHaveBeenCalledWith(appointmentReq)
            expect(result).toEqual(appointmentRes)
        })
        it('should throw an error if appointment creation fails', async () => {
            
            // Mock Process
            const appointmentReq: AppointmentReq = {identificacion_paciente: 'Pepito', especialidad: 'Cardiología', id_doctor: 15, horario: '7PM'};
            const error1 = new Error('Failed to create appointment');
            (appointmentRepository.createAppointment as jest.Mock).mockResolvedValue(error1)

            // Method execution
            await expect(appointmentService.createAppointment(appointmentReq)).rejects.toThrowError(error1)
            
            // Asserts
            expect(appointmentRepository.createAppointment).toHaveBeenCalledWith(appointmentReq)
        })
    })
    // Test getAppointmentById
    describe ('getAppointmentById', () => {
        it('should get appointment by id from service', async () => {
            
            // Mock process
            const appointment: Appointment = {identificacion_paciente: '2', especialidad: 'Oftalmología', doctor: 'Castellanos', consultorio: 14, horario: '10AM'};
            const appointmentId = 1;

            (appointmentRepository.getAppointmentById as jest.Mock).mockResolvedValue(appointment)

            // Method execution
            const result = await appointmentService.getAppointmentById(appointmentId)

            // Asserts
            expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(appointmentId)
            expect(result).toEqual(appointment)
    
        })
        it('should return an empty array when no appointments are found', async () => {
            
            // Mock Process
            const appointmentId = 1;
            (appointmentRepository.getAppointmentById as jest.Mock).mockResolvedValue(null)

            // Method execution
            const result = await appointmentService.getAppointmentById(appointmentId)

            // Asserts
            expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(appointmentId)
            expect(result).toBeNull()
        })
        it('should throw an error if retrieval fails', async () => {
            
            // Mock Process
            const appointmentId = 1;
            const error = new Error('Database error');
            (appointmentRepository.getAppointmentById as jest.Mock).mockRejectedValue(error)

            // Method
            await expect(appointmentService.getAppointmentById(appointmentId)).rejects.toThrowError(error)
            
            // Asserts
            expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(appointmentId)
        })
    })
})
