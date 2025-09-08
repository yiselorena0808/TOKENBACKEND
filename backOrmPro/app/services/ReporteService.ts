import Reporte from '#models/reporte'

class ReporteService {
  async crear(empresaId:number,datos: any) {
    const reporte = await Reporte.create({
      ...datos,
      id_empresa: empresaId,
    })

    return reporte
  }

  async listar(empresaId: number) {
    return await Reporte.query().where('id_empresa', empresaId)
  }

  async listarId(id_reporte: number, empresaId:number) {
    return await Reporte.query()
    .where('id_reporte', id_reporte)
    .andWhere('id_empresa', empresaId)
    .first()
  }

  async actualizar(id_reporte:number, empresaId:number, datos: any) {
    const reporte = await Reporte.find(id_reporte)
    if (!reporte) {
      return {error: 'reporte no encontrado'}
    }

    if(empresaId && reporte.id_empresa !== empresaId){
      return {error: 'No autorizado para actualizar el reporte'}
    }

    reporte.merge(datos)
    await reporte.save()
    return reporte
  }

  async eliminar(id_reporte: number, empresaId:number) {
    const reporte = await Reporte.query()
    .where('id_reporte', id_reporte)
    .andWhere('id_empresa', empresaId)
    .first()

    if (!reporte) {
      return { error: 'Reporte no encontrado o no autorizado' }
    }

    await reporte.delete()
    return { mensaje: 'Reporte eliminado correctamente' }
  }

  async conteo() {
    const reportes = await Reporte.query()
    return {
      total: reportes.length,
      reportes,
    }
  }
}

export default ReporteService