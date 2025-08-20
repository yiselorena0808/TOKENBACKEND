import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'publicacion_blogs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
       table.integer('id_usuario').unsigned().notNullable()
        .references('id').inTable('usuarios')
        .onDelete('CASCADE')  
        .onUpdate('CASCADE')
      table.string('nombre_usuario')
      table.string('titulo')
      table.date('fecha_Actividad')
      table.text('descripcion')
      table.text('imagen')
      table.text('archivo')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
