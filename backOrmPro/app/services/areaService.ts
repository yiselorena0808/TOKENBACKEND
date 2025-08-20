import Area from '../models/area.js'

export default class AreaService {
  async crearArea(data: Partial<Area>) {
    return await Area.create(data)
  }

  async listarAreas() {
    return await Area.query().preload('empresa')
  }
}
