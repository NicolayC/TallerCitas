import { Knex } from 'knex'
export async function up(knex:Knex): Promise<void> {
    await knex.raw(
        `
        CREATE TABLE IF NOT EXISTS doctores (
            id_doctor bigserial,
            nombre VARCHAR,
            apellido VARCHAR,
            especialidad VARCHAR,
            consultorio VARCHAR,
            correo VARCHAR
            created_at timestamptz,
            updated_at timestamptz,
            PRIMARY key(id_doctor)
        );
        
        CREATE TABLE IF NOT EXISTS pacientes (
            id_paciente bigserial,
            nombre VARCHAR,
            apellido VARCHAR,
            identificacion VARCHAR UNIQUE,
            telefono INT,
            created_at timestamptz,
            updated_at timestamptz,
            PRIMARY key(id_doctor)
        );
        
        CREATE TABLE IF NOT EXISTS citas (
            id_citas bigserial,
            horario VARCHAR,
            especialidad VARCHAR,
            id_doctor BIGINT,
            identificaion_paciente VARCHAR,
            created_at timestamptz,
            updated_at timestamptz,
            PRIMARY key(id_cita),
            CONSTRAINT fk_doctores
            FOREIGN KEY (id_doctor)
            REFERENCES doctores(id_doctor),
            CONSTRAINT fk_pacientes
            FOREIGN KEY (identificacion_paciente)
            REFERENCES pacientes(id_doctor)
        );
        `
    )
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(
    `
    DROP TABLE doctores;
    DROP TABLE pacientes;
    DROP TABLE citas;
    `
    )

}

