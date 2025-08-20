import Route from "@adonisjs/core/services/router"
import ActividadesLudicasController from "../../app/controller/ActividadLudicaController.js"
import AuthJwt from "../../app/middleware/auth_jwt.js"

const actividad = new ActividadesLudicasController()
const authJwt = new AuthJwt()

Route.post('/crearActividadLudica', actividad.crearActividad).use(authJwt.handle.bind(authJwt))
Route.get('/listarActividadesLudicas', actividad.listarActividades).use(authJwt.handle.bind(authJwt))
