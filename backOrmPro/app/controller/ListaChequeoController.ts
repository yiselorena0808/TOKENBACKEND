import ListaChequeoService from '#services/ListaChequeoService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext} from '@adonisjs/core/http'

const listaChequeoService = new ListaChequeoService()

class ListaChequeoController {
  async crearLista({ request, response }: HttpContext) {
    try {
      const datos = request.body()
      const nueva = await listaChequeoService.crear(datos)
      return response.json({ msj: 'lista creada', datos: nueva })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarListas({ response }: HttpContext) {
    try {
      const listas = await listaChequeoService.listar()
      return response.json({ msj: 'listado', datos: listas })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
  async actualizarLista({request,response,params}){
    try {
      const id = params.id
      const datos = request.body()
      const listaActualizada = await listaChequeoService.actualizar(id, datos)
      return response.json({ msj: 'lista actualizada', datos: listaActualizada })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
  async eliminarLista({ params, response }: HttpContext) {
    try {
      const id = params.id
      await listaChequeoService.eliminar(id)
      return response.json({ msj: 'lista eliminada' })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
}

export default ListaChequeoController
