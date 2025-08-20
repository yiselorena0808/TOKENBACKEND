import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Empresa from '../../app/models/empresa.js'

export default class extends BaseSeeder {
  async run() {
    await Empresa.createMany([
      {
        nombre: 'empresa 1',
        direccion: 'direccion empresa 1',
        NIT: '123456789',
        esquema: 'empresa1_schema',
        alias: 'e1',
        estado: true
      },
      {
        nombre: 'empresa 2',
        esquema: 'empresa2_schema',
        alias: 'e2',
        estado: true
      }
    ])
  }
}