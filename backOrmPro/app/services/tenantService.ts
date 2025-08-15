import Tenant from '../models/tenant.js'

export default class TenantService {
  async crearTenant(data: Partial<Tenant>) {
    return await Tenant.create(data)
  }

  async listarTenants() {
    return await Tenant.query().preload('areas')
  }
}
