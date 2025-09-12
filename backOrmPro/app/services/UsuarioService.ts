import bcrypt from 'bcryptjs'
import Usuario from '#models/usuario'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'sstrict'

class UsuarioService {
  async register(
    id_empresa: number,
    id_area: number,
    nombre: string,
    apellido: string,
    nombre_usuario: string,
    correo_electronico: string,
    cargo: string,
    contrasena: string,
    confirmacion: string
  ) {
    if (contrasena !== confirmacion) {
      return { mensaje: 'Las contraseñas no coinciden' }
    }

    const hash = await bcrypt.hash(contrasena, 10)

    const user = await Usuario.create({
      id_empresa,
      id_area,
      nombre,
      apellido,
      nombre_usuario,
      correo_electronico,
      cargo,
      contrasena: hash,
    })

    return {
      mensaje: 'Registro correcto',
      user: await Usuario.query()
        .where('id', user.id)
        .preload('empresa')
        .preload('area')
        .first(),
    }
  }

  async login(correo_electronico: string, contrasena: string) {
    if (!correo_electronico || !contrasena) {
      throw new Error('Campos obligatorios')
    }

    const usuario = await Usuario.query()
      .where('correo_electronico', correo_electronico)
      .preload('empresa')
      .preload('area')
      .first()

    if (!usuario) throw new Error('El usuario no existe')

    const isValid = await bcrypt.compare(contrasena, usuario.contrasena)
    if (!isValid) throw new Error('Contraseña incorrecta')

    const token = jwt.sign(
      {
        id: usuario.id,
        correoElectronico: usuario.correo_electronico,
        id_empresa: usuario.id_empresa,
        nombre: `${usuario.nombre} ${usuario.apellido}`, // 👈 nombre completo
      },
      SECRET,
      { expiresIn: '1h' }
    )

    return { mensaje: 'Login correcto', token, user: usuario }
  }

  async listar(empresaId: number) {
    return await Usuario.query()
      .where('id_empresa', empresaId)
      .preload('empresa')
      .preload('area')
  }

  async listarId(id: number, empresaId: number) {
    return await Usuario.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .preload('empresa')
      .preload('area')
      .first()
  }

  async actualizar(id: number, datos: Partial<Usuario>, empresaId: number) {
    const usuario = await Usuario.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .first()
    if (!usuario) return { error: 'Usuario no encontrado o autorizado' }

    usuario.merge(datos)
    await usuario.save()
    return usuario
  }

  async eliminar(id: number, empresaId: number) {
    const usuario = await Usuario.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .first()
    if (!usuario) return { mensaje: 'Usuario no encontrado o autorizado' }

    await usuario.delete()
    return { mensaje: 'Usuario eliminado' }
  }

  async conteo() {
    const usuarios = await Usuario.query()
    return { total: usuarios.length, usuarios }
  }
}

export default UsuarioService
