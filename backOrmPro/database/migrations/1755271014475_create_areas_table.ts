import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Areas extends BaseSchema {
  protected tableName = 'areas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_area') // PRIMARY KEY
      table
        .integer('id_tenant') // FOREIGN KEY
        .unsigned()
        .notNullable()
        .references('id_tenant')
        .inTable('tenants')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.string('nombre_area').notNullable()
      table.string('codigo_area').notNullable()
      table.string('descripcion')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
