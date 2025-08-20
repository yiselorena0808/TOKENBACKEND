import Router from "@adonisjs/core/services/router"
import UsuariosController from "../../app/controller/UsuarioController.js"
import AuthJwt from "#middleware/auth_jwt"
const usuario = new UsuariosController()
const authJwt = new AuthJwt()

// Rutas protegidas con JWT
Router.get('/listarUsuarios', usuario.listarUsuarios).use(authJwt.handle.bind(authJwt))
Router.get('/idUsuario/:id', usuario.listarUsuarioId).use(authJwt.handle.bind(authJwt))
Router.put('/actualizarUsuario/:id', usuario.actualizarUsuario).use(authJwt.handle.bind(authJwt))
Router.delete('/eliminarUsuario/:id', usuario.eliminarUsuario).use(authJwt.handle.bind(authJwt))
Router.get('/conteoUsuarios', usuario.conteoUsuarios).use(authJwt.handle.bind(authJwt))

// Rutas públicas
Router.post('/register', usuario.register) // Aquí se espera que llegue idTenant y idArea
Router.post('/login', usuario.login)
