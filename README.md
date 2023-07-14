# template_nodejs
It is a Node JS template struct.

## SRC

Folder principal del aplicativo, el cual contiene la lógica pertinente de los componentes y sus respectivas conexiones.

En **source** tendremos una estructura compuesta por lo siguiente

### API

Api contendrá los componentes propios del aplicativo REST de Node y a su vez tendrá la siguiente estructura

### Components
Se tiene el corazón de los componentes, como lo son las rutas, los controladores, modelos, repositorios, políticas y test.
Donde un componente tiene como objetivo representar un proceso importante dentro del desarrollo, como lo puede ser una entidad o casos  de uso generales.

* **clients** que son los procesos locales que se encargan de la lógica de comunicación o particularidades del proceso de comunicación con los entes externos, normalmente son varios procesos como podría ser conexión a una API externa, conexión a un servicio de nube, redis, kafka etc.

* **controler.js(ts)** es la clase que maneja los request entrantes y envía la respuesta del back hacia el usuario final

* **service.js(ts)** se encargará de toda la lógica propia del componente

* **model.js(ts)** representa los modelos de la base de datos para el componente, donde se tiene la estructura de datos a usar por componente y es usado normalmente por el repositorio

* **repository.js(ts)** es un interpretador para la base de datos y es lo que normalmente se importa como modelo para realizar los procesos de inserción, actualización, selección y borrado de datos sobre la base de datos, es aquí donde el ORM interactúa.

* **routes.js(ts)** la redirección de los endpoints del componente, es el que asigna los métodos del controlador.

* **<component>.spec.js(ts) -- opcional** archivo relacionado con los test.

* **policy.js(ts) --opcional** permite manejar las reglas de acceso a las operaciones (Está basado en roles)

### Middleware ("""opcional""") 
Carpeta que contiene todos los procesos de autenticación y validación, loggin o procesos de auditoría posterior a un request.

### routes.js
Es el que se encarga de registrar todas las rutas que pasan a través del middleware y de los componentes.

### server.js
Es donde se inicializa el servicio y se configura absolutamente todo lo que requiera el servidor de express.
* Importación de middlewares, componentes, rutas
* Manejo de errores
* Configuraciones de puertos

### Config

Es un directorio que contiene todos los procesos que se encargan de configurar la aplicación a nivel transversal

* **variables globales** variables que son globales para toda la aplicación
* **logger** configuración propia o específica del logueo, como lo es la estructura del mensaje, que tipos se quiere, que nivel de alerta se propagará, etc.

* **ACL (Access Control List)** Lista de control de acceso.

### test

Son test que permiten correr los test de cada uno de los componentes.

### app.js
Es este archivo se realiza la inicialización del servicio.

## utils (opcional)
Tiene servicios generales que pueden ser usados por los componentes o cualquier servicio dentros del aplicativo, es importante recalcar que soin procesos muy generales y que no deben resolver particularidades del servicio


## Configuración Proyecto
---
* El primer paso es el *package.json*, apartir del comando **npm init**
    
    * **name**: Nombre del proyecto.
    * **version**: Versión del proyecto.
    * **description**: Descripción del proyecto.
    * **entry point**: El archivo prinipal (main) del aplicativo.
    * **test command**: Si uno tiene test unitarios, acá se especifica el comando para ejecutarlos.
    * **git repository**: la ruta del repositorio en el que se encuentra el código.
    * **keywords**: Palabras claves del proyecto
    * **author**: Autory propietario del proyecto.
    * **license**: Especifica una licencia sobre la que se quiere distribuir el proyecto.


* Instalar typescript **npm install typescript**
* Instalar dependencias tales como:

    * express **npm install express**
    * ts-node **npm install ts-node --save-dev**
    * types/express **npm install @types/express**

* Crear un tsconfig por defecto con el comando **npx tsc --init**, y luego activamos la opción de **outDir dentro del archivo y definimos la carpeta que contiene el archivo main (index.ts o app.ts)

* Para correr el proyecto desde el main se hace uso del comando **npx ts-node src/app.ts**.

* Para las migraciones se debe instalar la dependencia del ORM llamado **knex**, donde haremos uso del comando **npm install knex knex-cli pg --save-dev**

* Para leer variables de entorno instalamos la librería  de dotenv **npm install dotenv**

* POSTGRES_URI=postgresql://<usuario_db>:<password_db>@<host_db>:<port_db>/<database> 

Tareas 16/06/2023

* Validar que los campos del request sean los del modelo DoctorReq, y si no  vienen completos decir cual falta, y si vienen de más, no tomarlos
* Hacer que el created_at y el updated_at se asignen de forma automática cuando se inserta un dato
* Completar los create y select de citas y pacientes 

## Test unitarios

Para configurar y crear los test unitarios, debemos instalar una librería llamada chai de la siguiente forma:

**npm install --save-dev chai-http chai-spies @types/chai @types/chai-http @types/chai-spies**

Para la ejecución de los test se debe hacer la instalación de la librería jest:

**npm install --save-dev jest ts-jest @types/jest**

Para ejecutar los test se debe elecutar el comando **npx jest**

Tareas 20/06/2023

* Completar los test  tanto para el service como para el controller de los componente de pacientes y citas

Tarea entregar taller 6

* Cambiar los erroresespecíficos por errores genéricos que se puedan adecuar
* Validación que la respuesta del doctor en creación de cita  en el service sea diferente de null, si no retornar que el doctor no existe, es decir, si el doctor no existe en la creación de la cita, decir que el doctor no fue encontrado
* Cambiar el customErrors de config a utils
* Completar por lo menos los test de citas o pacientes
* Terminar el crud de citas y pacientes



