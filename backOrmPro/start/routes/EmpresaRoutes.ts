import EmpresaController from '../../app/controller/EmpresaController.js'
import Route from "@adonisjs/core/services/router"
//import AuthJwt from "../../app/middleware/auth_jwt.js"

const empresaController = new EmpresaController()
//const authJwt = new AuthJwt()

Route.post('/crearEmpresa', empresaController.crearEmpresa)//.use(authJwt.handle.bind(authJwt))
Route.get('/listarEmpresas', empresaController.listarEmpresas)//.use(authJwt.handle.bind(authJwt))
Route.get('/idEmpresa/:id', empresaController.listarEmpresaId)//.use(authJwt.handle.bind(authJwt))
Route.delete('/eliminarEmpresa/:id', empresaController.eliminarEmpresa)//.use(authJwt.handle.bind(authJwt))
Route.put('/actualizarEmpresa/:id', empresaController.actualizarEmpresa)//.use(authJwt.handle.bind(authJwt))
Route.get('/conteoEmpresas', empresaController.conteoEmpresas)//.use(authJwt.handle.bind(authJwt))