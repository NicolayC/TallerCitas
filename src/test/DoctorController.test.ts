import { Request, Response } from "express"
import { DoctorController, DoctorControllerImpl } from "../api/components/doctores/controller"
import { DoctorService, DoctorServiceImpl } from "../api/components/doctores/service"
import { Doctor, DoctorReq } from "../api/components/doctores/model"

const mockReq = {} as Request
const mockRes = {} as Response

// Test Total DoctorController
describe('DoctorController', () => {
    let doctorService: DoctorService
    let doctorController: DoctorController

    beforeEach( () => {
        doctorService = {
            getAllDoctors: jest.fn(),
            createDoctor: jest.fn(),
            getDoctorById: jest.fn(),
            updateDoctor: jest.fn(),
            deleteDoctor: jest.fn()
        }
        doctorController = new DoctorControllerImpl(doctorService)
        mockRes.status = jest.fn().mockReturnThis()
        mockRes.json = jest.fn().mockReturnThis()
    })
    // Test getAllDoctors
    describe ('getAllDoctors', () => {

        it('should get all doctors',async () => {

            // Mock process
            const doctors: Doctor[] = [  
                {id_doctor: 1, nombre: 'Carlos', apellido: 'Cáceres', especialidad: 'Medicina General', consultorio: 100},
                {id_doctor: 1, nombre: 'Pedro', apellido: 'Pérez', especialidad: 'Ortopedia', consultorio: 101},
            ];

            (doctorService.getAllDoctors as jest.Mock).mockResolvedValue(doctors)

            // Method execution
            await doctorController.getAllDoctors(mockReq, mockRes)

            // Asserts
            expect(doctorService.getAllDoctors).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith(doctors)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should be handler error and return 400 status',async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (doctorService.getAllDoctors as jest.Mock).mockRejectedValue(error)

            // Method execution
            await doctorController.getAllDoctors(mockReq, mockRes)

            // Asserts
            expect(doctorService.getAllDoctors).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith({message: "Error getting all doctors"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })
    // Test createDoctor
    describe ('createDoctor', () => {

        it('should create a new doctor and return info',async () => {       

            // Mock process
            const doctorRes: Doctor = {id_doctor: 1, nombre: 'Carlos', apellido: 'Cáceres', especialidad: 'Medicina General', consultorio: 100};
            const doctorReq: DoctorReq = {nombre: 'Carlos', apellido: 'Cáceres', especialidad: 'Medicina General', consultorio: 100};
            
            (mockReq.body as DoctorReq) = doctorReq;
            (doctorService.createDoctor as jest.Mock).mockResolvedValue(doctorRes)

            // Method execution
            await doctorController.createDoctor(mockReq, mockRes)

            // Asserts
            expect(doctorService.createDoctor).toHaveBeenCalledWith(doctorReq)
            expect(mockRes.json).toHaveBeenCalledWith(doctorRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should be handler error and return 400 status', async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (mockReq.body) = {};
            (doctorService.createDoctor as jest.Mock).mockRejectedValue(error)
            
            // Method execution
            await doctorController.createDoctor(mockReq, mockRes)

            // Asserts
            expect(doctorService.createDoctor).toHaveBeenCalledWith()
            expect(mockRes.json).toHaveBeenCalledWith({message: "Internal Server Error"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })
    // Test getDoctorById
    describe ('getDoctorById', () => {

        it('should get doctor by id', async () => {   

            // Mock process
            const doctorRes: Doctor = {id_doctor: 1, nombre: 'Carlos', apellido: 'Cáceres', especialidad: 'Medicina General', consultorio: 100};       
            (mockReq.params) = { id: "1"};
            (doctorService.getDoctorById as jest.Mock).mockResolvedValue(doctorRes)

            // Method execution
            await doctorController.getDoctorById(mockReq, mockRes)

            // Asserts
            expect(doctorService.getDoctorById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith(doctorRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should return 400 if doctor no found', async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (mockReq.params) = { id: "1"};
            (doctorService.getDoctorById as jest.Mock).mockResolvedValue(null)
            
            // Method execution
            await doctorController.getDoctorById(mockReq, mockRes)

            // Asserts
            expect(doctorService.getDoctorById).toHaveBeenCalledWith()
            expect(mockRes.json).toHaveBeenCalledWith({message: "Record has no found yet"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })

        it('should return 400 if an error occurs', async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (mockReq.params) = { id: "1"};
            (doctorService.getDoctorById as jest.Mock).mockRejectedValue(error)
            
            // Method execution
            await doctorController.getDoctorById(mockReq, mockRes)

            // Asserts
            expect(doctorService.getDoctorById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to retrieve doctor"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })

})