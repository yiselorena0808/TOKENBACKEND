import Route from "@adonisjs/core/services/router"
import AreasController from "../../app/controller/areasController.js"


const areasController = new AreasController()


Route.post('/crearArea', areasController.crearArea)
Route.get('/listarAreas', areasController.listarAreas)