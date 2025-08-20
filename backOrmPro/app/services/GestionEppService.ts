import GestionEpp from '#models/gestion_epp'

class GestionEppService {
  async crear(datos: any) {
    return await GestionEpp.create(datos)
  }

  async listar() {
    return await GestionEpp.query()
  }

  async listarId(id: number) {
    return await GestionEpp.query().where('id', id)
  }

  async actualizar(id:any, datos: any) {
    const gestion = await GestionEpp.findBy('id', id)
    if (gestion) {
      gestion.merge(datos)
      await gestion.save()
      return gestion
    } else {
      return { error: 'Gestión no encontrada' }
    }
  }

  async eliminar(id: any) {
    const gestion = await GestionEpp.findBy('id', id)
    if (gestion) {
      await gestion.delete()
      return 'gestión eliminada'
    } else {
      return 'gestión no encontrada'
    }
  }

  async conteo() {
    const gestiones = await GestionEpp.query()
    return {
      total: gestiones.length,
      gestiones,
    }
  }
}

export default GestionEppService