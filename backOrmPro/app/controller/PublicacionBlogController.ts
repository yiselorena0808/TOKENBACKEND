import BlogService from '#services/PublicacionBlogService'
import { messages } from '@vinejs/vine/defaults'
import type { HttpContext} from '@adonisjs/core/http'

const blogService = new BlogService()

class BlogController {
  async crearBlog({ request, response }: HttpContext) {
    try {
      const datos = request.body()
      const nueva = await blogService.crear(datos)
      return response.json({ msj: 'publicacion creada', datos: nueva })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }

  async listarBlog({ response }: HttpContext) {
    try {
      const lista = await blogService.listar()
      return response.json({ msj: 'listado de publicaciones', datos: lista })
    } catch (error) {
      return response.json({ error: error.message, messages })
    }
  }
}

export default BlogController