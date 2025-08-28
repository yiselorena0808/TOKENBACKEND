import Empresa from "../models/empresa.js";

class EmpresaService {
  async crear(datos: any) {
    return await Empresa.create(datos);
  }

  async listar() {
    return await Empresa.query();
  }

  async listarId(id: number) {
    return await Empresa.query().where("id", id);
  }

  async actualizar(id: any, datos: any) {
    const empresa = await Empresa.findBy("id", id);
    if (empresa) {
      empresa.merge(datos);
      await empresa.save();
      return empresa;
    } else {
      return { error: "Empresa no encontrada" };
    }
  }

  async eliminar(id: any) {
    const empresa = await Empresa.findBy("id_empresa", id);
    if (empresa) {
      await empresa.delete();
      return "Empresa eliminada";
    } else {
      return "Empresa no encontrada";
    }
  }

  async conteo() {
    const empresas = await Empresa.query();
    return {
      total: empresas.length,
      empresas,
    };
  }
}

export default EmpresaService;