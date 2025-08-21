import UsuarioService from '#services/UsuarioService'
import type { HttpContext } from '@adonisjs/core/http'

const usuarioService = new UsuarioService()

export default class UsuarioController {
  async register({ request, response }: HttpContext) {
    const {
      id_empresa,
      id_area,
      nombre,
      apellido,
      nombre_usuario,
      correo_electronico,
      cargo,
      contrasena,
      confirmacion
    } = request.only([
      'id_empresa',
      'id_area',
      'nombre',
      'apellido',
      'nombre_usuario',
      'correo_electronico',
      'cargo',
      'contrasena',
      'confirmacion'
    ])

    const resultado = await usuarioService.register(
      id_empresa,
      id_area,
      nombre,
      apellido,
      nombre_usuario,
      correo_electronico,
      cargo,
      contrasena,
      confirmacion
    )

    return response.status(201).json(resultado)
  }

  async login({ request, response }: HttpContext) {
    const { correoElectronico, contrasena } = request.only([
      'correoElectronico',
      'contrasena'
    ])
    const resultado = await usuarioService.login(correoElectronico, contrasena)
    return response.json(resultado)
  }

  async listarUsuarios({ response }: HttpContext) {
    const usuarios = await usuarioService.listar()
    return response.json(usuarios)
  }

  async listarUsuarioId({ params, response }: HttpContext) {
    const usuario = await usuarioService.listarId(params.id)
    return response.json(usuario)
  }

  async actualizarUsuario({ params, request, response }: HttpContext) {
    const datos = request.all()
    const usuario = await usuarioService.actualizar(params.id, datos)
    return response.json(usuario)
  }

  async eliminarUsuario({ params, response }: HttpContext) {
    const resultado = await usuarioService.eliminar(params.id)
    return response.json(resultado)
  }

  async conteoUsuarios({ response }: HttpContext) {
    const conteo = await usuarioService.conteo()
    return response.json(conteo)
  }
}
