import { Doctor, DoctorReq } from "../api/components/doctores/model"
import { DoctorServiceImpl } from "../api/components/doctores/service"
import { DoctorRepository } from "../api/components/doctores/repository"

// Test Total DoctorService
describe('DoctorService', () => {
    let doctorService: DoctorServiceImpl
    let doctorRepository: DoctorRepository

    beforeEach( () => {
        doctorRepository = {
            getAllDoctors: jest.fn(),
            createDoctor: jest.fn(),
            getDoctorById: jest.fn(),
            updateDoctor: jest.fn(),
            deleteDoctor: jest.fn()
        }
        doctorService = new DoctorServiceImpl(doctorRepository)
    })
    // Test getAllDoctors
    describe ('getAllDoctors', () => {
        it('should get all doctors from service', async () => {

            // Mock process
            const doctors: Doctor[] = [
                {id_doctor: 1, nombre: 'Carlos', apellido: 'Cáceres', especialidad: 'Medicina General', consultorio: 100},
                {id_doctor: 1, nombre: 'Pedro', apellido: 'Pérez', especialidad: 'Ortopedia', consultorio: 101},
            ];
            (doctorRepository.getAllDoctors as jest.Mock).mockResolvedValue(doctors)

            // Method execution
            const result = await doctorService.getAllDoctors()

            // Asserts
            expect(doctorRepository.getAllDoctors).toHaveBeenCalled()
            expect(result).toEqual(doctors)           
        })
        it('should return an empty array when no doctors are found', async () => {
            
            // Mock process
            (doctorRepository.getAllDoctors as jest.Mock).mockResolvedValue([])

            // Method execution
            const result = await doctorService.getAllDoctors()

            // Asserts
            expect(doctorRepository.getAllDoctors).toHaveBeenCalled()
            expect(result).toEqual([])
        })
    })
    // Test createDoctor
    describe ('createDoctor', () => {
        it('should create a new doctor and return it from service', async () => {
            
            // Mock process
            const doctorRes: Doctor = {id_doctor: 1, nombre: 'Carlos', apellido: 'Cáceres', especialidad: 'Medicina General', consultorio: 100};
            const doctorReq: DoctorReq = {nombre: 'Carlos', apellido: 'Cáceres', especialidad: 'Medicina General', consultorio: 100};

            (doctorRepository.createDoctor as jest.Mock).mockResolvedValue(doctorRes)

            // Method execution
            const result = await doctorService.createDoctor(doctorReq)

            // Asserts
            expect(doctorRepository.createDoctor).toHaveBeenCalledWith(doctorReq)
            expect(result).toEqual(doctorRes)
        })
        it('should throw an error if doctor creation fails', async () => {
            
            // Mock Process
            const doctorReq: DoctorReq = {nombre: 'Carlos', apellido: 'Cáceres', especialidad: 'Medicina General', consultorio: 100};
            const error1 = new Error('Failed to create doctor');
            (doctorRepository.createDoctor as jest.Mock).mockResolvedValue(error1)

            // Method execution
            await expect(doctorService.createDoctor(doctorReq)).rejects.toThrowError(error1)
            
            // Asserts
            expect(doctorRepository.createDoctor).toHaveBeenCalledWith(doctorReq)
        })
    })
    // Test getDoctorById
    describe ('getDoctorById', () => {
        it('should get doctor by id from service', async () => {
            
            // Mock process
            const doctor: Doctor = {id_doctor: 1, nombre: 'Carlos', apellido: 'Cáceres', especialidad: 'Medicina General', consultorio: 100};
            const doctorId = 1;

            (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(doctor)

            // Method execution
            const result = await doctorService.getDoctorById(doctorId)

            // Asserts
            expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId)
            expect(result).toEqual(doctor)
    
        })
        it('should return an empty array when no doctors are found',async () => {
            
            // Mock Process
            const doctorId = 1;
            (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(null)

            // Method execution
            const result = await doctorService.getDoctorById(doctorId)

            // Asserts
            expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId)
            expect(result).toBeNull()
        })
        it('should throw an error if retrieval fails', async () => {
            
            // Mock Process
            const doctorId = 1;
            const error = new Error('Database error');
            (doctorRepository.getDoctorById as jest.Mock).mockRejectedValue(error)

            // Method
            await expect(doctorService.getDoctorById(doctorId)).rejects.toThrowError(error)
            
            // Asserts
            expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId)
        })
    })
})
