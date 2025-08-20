import PublicacionBlog from '#models/publicacion_blog'

class PublicacionBlogService {
  async crear(datos: any) {
    return await PublicacionBlog.create(datos)
  }

  async listar() {
    return await PublicacionBlog.query()
  }

  async listarId(id: number) {
    return await PublicacionBlog.query().where('id', id)
  }

  async actualizar(id:number, datos: any) {
    const blog = await PublicacionBlog.findBy('id', id)
    if (blog) {
      blog.merge(datos)
      await blog.save()
      return blog
    } else {
      return { error: 'Publicación no encontrada' }
    }
  }

  async eliminar(id: number) {
    const blog = await PublicacionBlog.findBy('id', id)
    if (blog) {
      await blog.delete()
      return 'publicación eliminada'
    } else {
      return 'publicación no encontrada'
    }
  }

  async conteo() {
    const blogs = await PublicacionBlog.query()
    return {
      total: blogs.length,
      blogs,
    }
  }
}

export default PublicacionBlogService