import Route from "@adonisjs/core/services/router"
import TenantsController from "../../app/controller/tenatsController.js"
import AuthJwt from "#middleware/auth_jwt"

const tenantsController = new TenantsController()
const authJwt = new AuthJwt()

Route.post('/crearTenant', tenantsController.crearTenant)
Route.get('/listarTenants', tenantsController.listarTenants)
