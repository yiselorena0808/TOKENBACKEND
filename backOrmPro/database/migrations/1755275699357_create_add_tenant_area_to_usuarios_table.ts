import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddTenantAreaToUsuarios extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('id_tenant').unsigned().references('id_tenant').inTable('tenants').onDelete('CASCADE')
      table.integer('id_area').unsigned().references('id_area').inTable('areas').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('id_tenant')
      table.dropColumn('id_area')
    })
  }
}
