import Reporte from "#models/reporte"

interface DatosReporte {
  id_usuario: number
  id_empresa: number
  nombre_usuario: string
  cargo: string
  cedula: string
  fecha: string
  lugar: string
  descripcion: string
  imagen?: string
  archivos?: string
  estado: string
}

export default class ReporteService {
  // Crear reporte
  async crear(idEmpresa: number, datos: DatosReporte) {
    const reporte = new Reporte()
    reporte.fill({
      ...datos,
      id_empresa: idEmpresa,
    })
    await reporte.save()
    return reporte
  }

  // Listar reportes por empresa
  async listar(idEmpresa: number) {
    return await Reporte.query().where('id_empresa', idEmpresa).orderBy('fecha', 'desc')
  }

  // Listar reporte por id y empresa
  async listarId(id: number, idEmpresa: number) {
    return await Reporte.query()
      .where('id', id)
      .andWhere('id_empresa', idEmpresa)
      .firstOrFail()
  }

  // Actualizar reporte
  async actualizar(id: number, idEmpresa: number, datos: Partial<DatosReporte>) {
    const reporte = await Reporte.query()
      .where('id', id)
      .andWhere('id_empresa', idEmpresa)
      .firstOrFail()

    reporte.merge(datos)
    await reporte.save()
    return reporte
  }

  // Eliminar reporte
  async eliminar(id: number, idEmpresa: number) {
    const reporte = await Reporte.query()
      .where('id', id)
      .andWhere('id_empresa', idEmpresa)
      .firstOrFail()

    await reporte.delete()
    return { mensaje: 'Reporte eliminado' }
  }

  // Conteo total de reportes (opcional)
  async conteo() {
    return await Reporte.query().count('* as total')
  }
}
