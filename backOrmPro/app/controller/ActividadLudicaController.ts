import ActividadLudicaService from '#services/ActividadLudicaService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext} from '@adonisjs/core/http'

const actividadLudicaService = new ActividadLudicaService()

class ActividadesLudicasController {
  async crearActividad({ request, response }: HttpContext) {
    try {
      const datos = request.body()
      const nueva = await actividadLudicaService.crear(datos)
      return response.json({ msj: 'actividad creada', datos: nueva })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarActividades({ response }: HttpContext) {
    try {
      const lista = await actividadLudicaService.listar()
      return response.json({ msj: 'listado de actividades', datos: lista })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarIdActividad({ params, response }: HttpContext) {
    try {
      const id = params.id
      const actividad = await actividadLudicaService.listarId(id)
      return response.json({ msj: 'actividad encontrada', datos: actividad })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async eliminarActividad({ params, response }: HttpContext) {
    try {
      const id = params.id
      await actividadLudicaService.eliminar(id)
      return response.json({ msj: 'actividad eliminada' })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }}

    async actualzarActividad({request,response,params}: HttpContext) {  
      try {
        const id = params.id
        const datos = request.body()
        const actividadActualizada = await actividadLudicaService.actualizar(id, datos)
        return response.json({ msj: 'actividad actualizada', datos: actividadActualizada })
      } catch (error) {
        return response.json({ error: error.message, messages })
      }
    }
}

export default ActividadesLudicasController