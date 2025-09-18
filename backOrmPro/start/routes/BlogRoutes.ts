import Route from "@adonisjs/core/services/router"
import BlogController from "../../app/controller/PublicacionBlogController.js"

const blog = new BlogController()

Route.post('/crearBlog', blog.crearBlog)
Route.get('/listarBlog', blog.listarBlog)
Route.get('/listarBlogId/:id', blog.listarBlogId)
Route.put('/actualizarBlog/:id', blog.actualizarBlog)
Route.delete('/eliminarBlog/:id', blog.eliminarBlog)