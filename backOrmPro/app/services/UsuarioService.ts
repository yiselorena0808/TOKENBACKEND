import bcrypt from 'bcryptjs'
import Usuario from '#models/usuario'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'sstrict'

class UsuarioService {
  async register(
    idEmpresa: number,
    idArea: number,
    nombre: string,
    apellido: string,
    nombreUsuario: string,
    correoElectronico: string,
    cargo: string,
    contrasena: string,
    confirmacion: string,
  ) {
    if (contrasena !== confirmacion) {
      return { mensaje: 'Las contraseñas no coinciden' }
    }

    const hash = await bcrypt.hash(contrasena, 10)

    const user = await Usuario.create({
      idEmpresa,
      idArea,
      nombre,
      apellido,
      nombreUsuario,
      correoElectronico,
      cargo,
      contrasena: hash
    })

    const token = jwt.sign(
      {
        id: user.id,
        correoElectronico: user.correoElectronico,
        timestamp: Date.now()
      },
      SECRET,
      { expiresIn: '1h' }
    )

    return {
      mensaje: 'Registro correcto',
      user: await Usuario.query().where('id', user.id).preload('empresa').preload('area').first(),
      token
    }
  }

  async login(correoElectronico: string, contrasena: string) {
    if (!correoElectronico || !contrasena) {
      return { mensaje: 'Campos obligatorios' }
    }

    const user = await Usuario.query()
      .where('correo_electronico', correoElectronico)
      .preload('empresa')
      .preload('area')
      .first()

    if (!user) return { mensaje: 'El usuario no existe' }

    const isValid = await bcrypt.compare(contrasena, user.contrasena)
    if (!isValid) return { mensaje: 'Contraseña incorrecta' }

    const token = jwt.sign(
      {
        id: user.id,
        correoElectronico: user.correoElectronico,
        timestamp: Date.now()
      },
      SECRET,
      { expiresIn: '1h' }
    )

    return { mensaje: 'Login correcto', token, user }
  }

  async listar() {
    return await Usuario.query().preload('empresa').preload('area')
  }

  async listarId(id: number) {
    return await Usuario.query().where('id', id).preload('empresa').preload('area').first()
  }

  async actualizar(id: number, datos: Partial<Usuario>) {
    const usuario = await Usuario.find(id)
    if (!usuario) return { error: 'Usuario no encontrado' }

    usuario.merge(datos)
    await usuario.save()
    return await Usuario.query().where('id', id).preload('empresa').preload('area').first()
  }

  async eliminar(id: number) {
    const usuario = await Usuario.find(id)
    if (!usuario) return { mensaje: 'Usuario no encontrado' }

    await usuario.delete()
    return { mensaje: 'Usuario eliminado' }
  }

  async conteo() {
    const usuarios = await Usuario.query()
    return { total: usuarios.length, usuarios }
  }
}

export default UsuarioService
