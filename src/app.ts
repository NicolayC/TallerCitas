import express, {Request, Response} from 'express'
import logger from './utils/logger'
import routes from './api/routes'

const app = express()
const port = 8087


// Crea un middleware para convertir 
//todos los bodies request en JSON
app.use(express.json()) 
app.use(errorHandlerMiddleware)
app.use('api/v1', routes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
}
)

module.exports = app;