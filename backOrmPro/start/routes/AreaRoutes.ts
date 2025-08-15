import Route from "@adonisjs/core/services/router"
import AreasController from "../../app/controller/areasController.js"
import AuthJwt from "#middleware/auth_jwt"

const areasController = new AreasController()
const authJwt = new AuthJwt()

Route.post('/crearArea', areasController.crearArea)
Route.get('/listarAreas', areasController.listarAreas)