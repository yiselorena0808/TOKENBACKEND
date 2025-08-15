import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Area from './area.js'

export default class Tenant extends BaseModel {
  @column({ isPrimary: true })
  declare id_tenant: number

  @column()
  declare nombre: string

  @column()
  declare esquema: string

  @column()
  declare alias: string

  @column()
  declare estado: boolean

  @hasMany(() => Area, {
    foreignKey: 'id_tenant',
  })
  declare areas: HasMany<typeof Area>
}
