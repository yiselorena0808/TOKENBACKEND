import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Area from '../../../app/models/area.js'

export default class extends BaseSeeder {
  async run() {
    await Area.createMany([
      {
        nombre_area: 'area 1',
        codigo_area: 'area1_code',
        descripcion: 'descripcion area 1',
        id_empresa: 1,
        esquema: 'area1_schema',
        alias: 'a1',
        estado: true
      },
      {
        nombre_area: 'area 2',
        codigo_area: 'area2_code',
        descripcion: 'descripcion area 2',
        id_empresa: 1,
        esquema: 'area2_schema',
        alias: 'a2',
        estado: true
      }
    ])
  }
}