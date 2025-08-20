import Tenat from '../models/tenant.js'
import  TenantStorage  from './TenantStorage.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class TenatService {
  private query(): ModelQueryBuilderContract<typeof Tenat, Tenat> {
    const tenantId = TenantStorage.getTenantId()

    if (!tenantId) {
      throw new Error('No tenant context found')
    }
    
    return Tenat.query().where('id_tenat', tenantId)
  }

  public async getMyTenant() {
    return await this.query().first()
  }

  public async updateMyTenant(data: Partial<Tenat>) {
    const tenant = await this.query().first()
    if (!tenant) return null
    tenant.merge(data)
    await tenant.save()
    return tenant
  }
}
