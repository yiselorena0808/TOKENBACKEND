import Reporte from '#models/reporte'

class ReporteService {
  async crear(datos: any) {
    return await Reporte.create(datos)
  }

  async listar() {
    return await Reporte.query()
  }

  async listarId(id_reporte: number) {
    return await Reporte.query().where('id_reporte', id_reporte)
  }

  async actualizar(id_reporte:number, datos: any) {
    const reporte = await Reporte.findBy('id_reporte', id_reporte)
    if (reporte) {
      reporte.merge(datos)
      await reporte.save()
      return reporte
    } else {
      return { error: 'Reporte no encontrado' }
    }
  }

  async eliminar(id_reporte: number) {
    const reporte = await Reporte.findBy('id_reporte', id_reporte)
    if (reporte) {
      await reporte.delete()
      return 'reporte eliminado'
    } else {
      return 'reporte no encontrado'
    }
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