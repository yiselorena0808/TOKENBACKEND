import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Usuario from './usuario.js'
import type {BelongsTo} from '@adonisjs/lucid/types/relations'

export default class ActividadLudica extends BaseModel {
   public static table = 'actividades_ludicas'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_usuario:number

  @column()
  declare nombre_usuario: string

  @column()
  declare nombre_actividad: string

  @column()
  declare fecha_actividad: string

  @column()
  declare descripcion: string

  @column()
  declare imagen_video: string

  @column()
  declare archivo_adjunto: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Usuario)
  declare usuario: BelongsTo<typeof Usuario>
}
