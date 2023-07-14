import { Request, Response } from "express"
import { PatientController, PatientControllerImpl } from "../api/components/pacientes/controller"
import { PatientService, PatientServiceImpl } from "../api/components/pacientes/service"
import { Patient, PatientReq } from "../api/components/pacientes/model"

const mockReq = {} as Request
const mockRes = {} as Response

// Test Total PatientController
describe('PatientController', () => {
    let patientService: PatientService
    let patientController: PatientController

    beforeEach( () => {
        patientService = {
            getAllPatients: jest.fn(),
            createPatient: jest.fn(),
            getPatientById: jest.fn(),
            updatePatient: jest.fn(),
            deletePatient: jest.fn()
        }
        patientController = new PatientControllerImpl(patientService)
        mockRes.status = jest.fn().mockReturnThis()
        mockRes.json = jest.fn().mockReturnThis()
    })
    // Test getAllPatients
    describe ('getAllPatients', () => {

        it('should get all patients',async () => {

            // Mock process
            const patients: Patient[] = [  
                {id_paciente: 1, nombre: 'Pedro', apellido: 'Navajas', identificacion: '115684', telefono: 100147},
                {id_paciente: 1, nombre: 'Andrea', apellido: 'Castro', identificacion: '5748863', telefono: 478581425},
            ];

            (patientService.getAllPatients as jest.Mock).mockResolvedValue(patients)

            // Method execution
            await patientController.getAllPatients(mockReq, mockRes)

            // Asserts
            expect(patientService.getAllPatients).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith(patients)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should be handler error and return 400 status',async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (patientService.getAllPatients as jest.Mock).mockRejectedValue(error)

            // Method execution
            await patientController.getAllPatients(mockReq, mockRes)

            // Asserts
            expect(patientService.getAllPatients).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith({message: "Error getting all doctors"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })
    // Test createPatient
    describe ('createPatient', () => {

        it('should create a new patient and return info',async () => {       

            // Mock process
            const doctorRes: Patient = {id_paciente: 1, nombre: 'Pedro', apellido: 'Navajas', identificacion: '115684', telefono: 100147};
            const doctorReq: PatientReq = {nombre: 'Juana', apellido: 'Tellez', identificacion: '53453'};
            
            (mockReq.body as PatientReq) = doctorReq;
            (patientService.createPatient as jest.Mock).mockResolvedValue(doctorRes)

            // Method execution
            await patientController.createPatient(mockReq, mockRes)

            // Asserts
            expect(patientService.createPatient).toHaveBeenCalledWith(doctorReq)
            expect(mockRes.json).toHaveBeenCalledWith(doctorRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should be handler error and return 400 status', async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (mockReq.body) = {};
            (patientService.createPatient as jest.Mock).mockRejectedValue(error)
            
            // Method execution
            await patientController.createPatient(mockReq, mockRes)

            // Asserts
            expect(patientService.createPatient).toHaveBeenCalledWith()
            expect(mockRes.json).toHaveBeenCalledWith({message: "Internal Server Error"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })
    // Test getPatientById
    describe ('getPatientById', () => {

        it('should get patient by id', async () => {   

            // Mock process
            const doctorRes: Patient = {id_paciente: 1, nombre: 'Pedro', apellido: 'Navajas', identificacion: '115684', telefono: 100147};       
            (mockReq.params) = { id: "1"};
            (patientService.getPatientById as jest.Mock).mockResolvedValue(doctorRes)

            // Method execution
            await patientController.getPatientById(mockReq, mockRes)

            // Asserts
            expect(patientService.getPatientById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith(doctorRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should return 400 if doctor no found', async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (mockReq.params) = { id: "1"};
            (patientService.getPatientById as jest.Mock).mockResolvedValue(null)
            
            // Method execution
            await patientController.getPatientById(mockReq, mockRes)

            // Asserts
            expect(patientService.getPatientById).toHaveBeenCalledWith()
            expect(mockRes.json).toHaveBeenCalledWith({message: "Record has no found yet"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })

        it('should return 400 if an error occurs', async () => {

            // Mock process
            const error = new Error('Internal Server Error');
            (mockReq.params) = { id: "1"};
            (patientService.getPatientById as jest.Mock).mockRejectedValue(error)
            
            // Method execution
            await patientController.getPatientById(mockReq, mockRes)

            // Asserts
            expect(patientService.getPatientById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to retrieve doctor"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })

})