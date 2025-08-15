import { AsyncLocalStorage } from 'async_hooks'

type TenantStore = {
  tenantId?: number
}

export const tenantStorage = new AsyncLocalStorage<TenantStore>()

export function setTenantId(id: number) {
  tenantStorage.enterWith({ tenantId: id })
}

export function getTenantId(): number | undefined {
  return tenantStorage.getStore()?.tenantId
}
