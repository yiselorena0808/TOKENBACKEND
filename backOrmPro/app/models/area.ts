import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tenant from './tenant.js'

export default class Area extends BaseModel {
  @column({ isPrimary: true })
  declare id_area: number

  @column()
  declare id_tenant: number

  @column()
  declare nombre_area: string

  @column()
  declare codigo_area: string

  @column()
  declare descripcion: string | null

  @belongsTo(() => Tenant, {
    foreignKey: 'id_tenant',
  })
  declare tenant: BelongsTo<typeof Tenant>
}
