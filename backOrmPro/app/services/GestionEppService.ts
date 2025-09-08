import GestionEpp from '#models/gestion_epp'

class GestionEppService {
  async crear(datos: any, empresaId: number) {
    return await GestionEpp.create({ ...datos, id_empresa:empresaId })
  }

  async listar(empresaId: number) {
    return await GestionEpp.query()
      .where('id_empresa', empresaId)
      .preload('empresa')
      .preload('area')
  }

  async listarId(id: number, empresaId: number) {
    return await GestionEpp.query()
    .where('id', id)
    .andWhere('id_empresa', empresaId)
    .preload('empresa')
    .preload('area')
    .first()
  }

  async actualizar(id:any, datos: any, empresaId: number) {
    const gestion = await GestionEpp.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .first()

      if(!gestion){
        throw new Error('Gestión no encontrada')
      }

    gestion.merge(datos)
    await gestion.save()
    return
    
  }

  async eliminar(id: any, empresaId: number) {
    const gestion = await GestionEpp.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .first()

    if (!gestion) {
      throw new Error('Gestión no encontrada')
    }

    await gestion.delete()
    return { mensaje: 'Gestión eliminada'}
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