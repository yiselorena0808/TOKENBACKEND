import Area from '../models/area.js'

export default class AreaService {
  async crearArea(data: Partial<Area>) {
    const area = await Area.create(data)
    return area
  }

  async listarAreas() {
    const areas = await Area.all()
    return areas
  }

  async listarId(id: number) {
    const area = await Area.find(id)
    return area 
  }

  async actualizar(id: number, data: Partial<Area>) {
    const area = await Area.find(id)
    if (area) {
      area.merge(data)
      await area.save()
      return area
    } else {
      return { error: 'Área no encontrada' }
    }
  }

  async eliminar(id: number) {
    const area = await Area.find(id)
    if (area) {
      await area.delete()
      return 'Área eliminada'
    } else {
      return 'Área no encontrada'
    }
  }
}
