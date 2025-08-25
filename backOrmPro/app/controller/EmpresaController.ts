import EmpresaService from '../services/EmpresaService.js'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext} from '@adonisjs/core/http'

const empresaService = new EmpresaService()

class EmpresaController {
  async crearEmpresa({ request, response }: HttpContext) {
    try {
      const datos = request.body()
      const nueva = await empresaService.crear(datos)
      return response.json({ msj: 'empresa creada', datos: nueva })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarEmpresas({ response }: HttpContext) {
    try {
      const empresas = await empresaService.listar()
      return response.json({ msj: 'listado', datos: empresas })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarEmpresaId({ params, response }: HttpContext) {
    try {
      const empresa = await empresaService.listarId(params.id)
      return response.json({ msj: 'empresa encontrada', datos: empresa })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async actualizarEmpresa({ params, request, response }: HttpContext) {
    try {
      const actualizado = await empresaService.actualizar(params.id, request.body())
      return response.json({ msj: 'empresa actualizada', datos: actualizado })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async eliminarEmpresa({ params, response }: HttpContext) {
    try {
      const resp = await empresaService.eliminar(params.id)
      return response.json({ msj: resp })
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  async conteoEmpresas({ response }: HttpContext) {
    try {
      const conteo = await empresaService.conteo()
      return response.json({ msj: 'conteo realizado', datos: conteo })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
}

export default EmpresaController