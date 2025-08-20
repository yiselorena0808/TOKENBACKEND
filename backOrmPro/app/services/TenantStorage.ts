import { AsyncLocalStorage } from 'async_hooks'
import db from '@adonisjs/lucid/services/db'

type TenantStore = { tenantId?: number }
type TenantEmpresa = { empresaId?: number }

class TenantStorage {
  private static storage = new AsyncLocalStorage<TenantStore>();
  private static estorage = new AsyncLocalStorage<TenantEmpresa>();

  static run(tenantId: number, callback: () => void) {
    TenantStorage.storage.run({ tenantId }, callback);
  }

  private getEmpresaId(): number | null {
  return TenantStorage.estorage.getStore()?.empresaId ?? null
}

static setEmpresaId(empreId: number) {
     const store = TenantStorage.estorage.getStore();
    if (store) {
      store.empresaId = empreId;
    } else {
      throw new Error('No active tenant context found');
    }
  }

  async getEmpresa() {
    const empresaId = this.getEmpresaId()
    if (!empresaId) {
      throw new Error('No hay empresaId en contexto')
    }

    return await db.from('empresas').where('id', empresaId).first()
  }

  static setTenantId(tenantId: number) {
    const store = TenantStorage.storage.getStore();
    if (store) {
      store.tenantId = tenantId;
    } else {
      throw new Error('No active tenant context found');
    }
  }

  static getTenantId(): number | undefined {
    return TenantStorage.storage.getStore()?.tenantId;
  }
}

export default TenantStorage;
