
import { Patient, PatientReq } from "../api/components/pacientes/model"
//import { Doctor, DoctorReq } from "../api/components/doctores/model"

import { PatientServiceImpl } from "../api/components/pacientes/service"
//import { DoctorServiceImpl } from "../api/components/doctores/service"

import { PatientRepository } from "../api/components/pacientes/repository"
//import { DoctorRepository } from "../api/components/doctores/repository"

// Test Total DoctorService
describe('DoctorService', () => {
    let patientService: PatientServiceImpl
    let patientRepository: PatientRepository

    beforeEach( () => {
        patientRepository = {
            getAllPatients: jest.fn(),
            createPatient: jest.fn(),
            getPatientById: jest.fn(),
            updatePatient: jest.fn(),
            deletePatient: jest.fn()
        }
        patientService = new PatientServiceImpl(patientRepository)
    })
    // Test getAllPatients
    describe ('getAllPatients', () => {
        it('should get all patients from service', async () => {

            // Mock process
            const doctors: Patient[] = [
                {id_paciente: 1, nombre: 'Pedro', apellido: 'Navajas', identificacion: '115684', telefono: 100147},
                {id_paciente: 1, nombre: 'Andrea', apellido: 'Castro', identificacion: '5748863', telefono: 478581425},
            ];
            (patientRepository.getAllPatients as jest.Mock).mockResolvedValue(doctors)

            // Method execution
            const result = await patientService.getAllPatients()

            // Asserts
            expect(patientRepository.getAllPatients).toHaveBeenCalled()
            expect(result).toEqual(doctors)           
        })
        it('should return an empty array when no patients are found', async () => {
            
            // Mock process
            (patientRepository.getAllPatients as jest.Mock).mockResolvedValue([])

            // Method execution
            const result = await patientService.getAllPatients()

            // Asserts
            expect(patientRepository.getAllPatients).toHaveBeenCalled()
            expect(result).toEqual([])
        })
    })
    // Test createPatient
    describe ('createPatient', () => {
        it('should create a new patient and return it from service', async () => {
            
            // Mock process
            const patientRes: Patient = {id_paciente: 1, nombre: 'Pedro', apellido: 'Navajas', identificacion: '115684', telefono: 100147};
            const patientReq: PatientReq = {nombre: 'Juana', apellido: 'Tellez', identificacion: '53453'};

            (patientRepository.createPatient as jest.Mock).mockResolvedValue(patientRes)

            // Method execution
            const result = await patientService.createPatient(patientReq)

            // Asserts
            expect(patientRepository.createPatient).toHaveBeenCalledWith(patientReq)
            expect(result).toEqual(patientRes)
        })
        it('should throw an error if patient creation fails', async () => {
            
            // Mock Process
            const patientReq: PatientReq = {nombre: 'Juana', apellido: 'Tellez', identificacion: '53453'};
            const error1 = new Error('Failed to create patient');
            (patientRepository.createPatient as jest.Mock).mockResolvedValue(error1)

            // Method execution
            await expect(patientService.createPatient(patientReq)).rejects.toThrowError(error1)
            
            // Asserts
            expect(patientRepository.createPatient).toHaveBeenCalledWith(patientReq)
        })
    })
    // Test getPatientById
    describe ('getPatientById', () => {
        it('should get patient by id from service', async () => {
            
            // Mock process
            const patient: Patient = {id_paciente: 1, nombre: 'Pedro', apellido: 'Navajas', identificacion: '115684', telefono: 100147};
            const patientId = 1;

            (patientRepository.getPatientById as jest.Mock).mockResolvedValue(patient)

            // Method execution
            const result = await patientService.getPatientById(patientId)

            // Asserts
            expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId)
            expect(result).toEqual(patient)
    
        })
        it('should return an empty array when no patients are found', async () => {
            
            // Mock Process
            const doctorId = 1;
            (patientRepository.getPatientById as jest.Mock).mockResolvedValue(null)

            // Method execution
            const result = await patientService.getPatientById(doctorId)

            // Asserts
            expect(patientRepository.getPatientById).toHaveBeenCalledWith(doctorId)
            expect(result).toBeNull()
        })
        it('should throw an error if retrieval fails', async () => {
            
            // Mock Process
            const patientId = 1;
            const error = new Error('Database error');
            (patientRepository.getPatientById as jest.Mock).mockRejectedValue(error)

            // Method
            await expect(patientService.getPatientById(patientId)).rejects.toThrowError(error)
            
            // Asserts
            expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId)
        })
    })
})
