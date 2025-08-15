import type { HttpContext } from '@adonisjs/core/http'
import AreaService from '#services/areaService'

const areaService = new AreaService()

export default class AreasController {
  async crearArea({ request, response }: HttpContext) {
    const data = request.only(['id_tenant', 'nombre_area', 'codigo_area', 'descripcion'])
    const area = await areaService.crearArea(data)
    return response.status(201).json(area)
  }

  async listarAreas({ response }: HttpContext) {
    const areas = await areaService.listarAreas()
    return response.json(areas)
  }
}
