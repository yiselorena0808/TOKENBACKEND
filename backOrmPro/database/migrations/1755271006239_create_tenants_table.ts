import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Tenants extends BaseSchema {
  protected tableName = 'tenants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_tenant') // PRIMARY KEY
      table.string('nombre').notNullable()
      table.string('esquema').unique().notNullable()
      table.string('alias').unique().notNullable()
      table.boolean('estado').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
