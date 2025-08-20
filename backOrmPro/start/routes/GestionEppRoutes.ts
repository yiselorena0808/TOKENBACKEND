import Route from "@adonisjs/core/services/router"
import GestionController from "../../app/controller/GestionEppController.js"
import AuthJwt from "../../app/middleware/auth_jwt.js"

const gestion = new GestionController()
const authJwt = new AuthJwt()

Route.post('/crearGestion', gestion.crearGestion).use(authJwt.handle.bind(authJwt))
Route.get('/listarGestiones', gestion.listarGestiones).use(authJwt.handle.bind(authJwt))
Route.put('/actualizarEstadoGestion/:id', gestion.actualizarEstado).use(authJwt.handle.bind(authJwt))
Route.delete('/eliminarGestion/:id', gestion.eliminarGestion).use(authJwt.handle.bind(authJwt))
