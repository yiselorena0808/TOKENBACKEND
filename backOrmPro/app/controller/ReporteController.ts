import ReporteService from '#services/ReporteService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext} from '@adonisjs/core/http'

const reporteService = new ReporteService()

class ReportesController {


  async crearReporte({ request, response }: HttpContext) {
    try {
      const datos = request.only(['nombre_usuario', 'cargo', 'cedula', 'fecha', 'lugar', 'descripcion', 'imagen', 'archivos'])
      const empresaId = (request as any).empresaId
      return reporteService.crear(empresaId, datos)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarReportes({ response }: HttpContext) {
    try {
      const empresaId = (Request as any).empresaId
      return reporteService.listar(empresaId)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarReporteId({ params, response }: HttpContext) {
    try {
      const id = params.id
      const empresaId = (Request as any).empresaId
      return reporteService.listarId(id, empresaId) 
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async actualizarReporte({ params, request, response }: HttpContext) {
    try {
      const id = params.id
      const empresaId = (request as any).empresaId
      const datos = request.only(['nombre_usuario', 'cargo', 'cedula', 'fecha', 'lugar', 'descripcion', 'imagen', 'archivos'])
      return reporteService.actualizar(id, empresaId, datos)
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async eliminarReporte({ params, response }: HttpContext) {
    try {
      const id = params.id
      const empresaId = (Request as any).empresaId
      return reporteService.eliminar(id, empresaId)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  async conteoReportes({ response }:  HttpContext) {
    try {
      const resultado = await reporteService.conteo()
      return response.json({ msj: 'conteo realizado', datos: resultado })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}

export default ReportesController