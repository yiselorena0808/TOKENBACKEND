import { AsyncLocalStorage } from 'async_hooks'

type EmpresaStore = {
  empresaId?: number
}

export const empresaStorage = new AsyncLocalStorage<EmpresaStore>()

export function setEmpresaId(id: number) {
  empresaStorage.enterWith({ empresaId: id })
}

export function getEmpresaId(): number | undefined {
  return empresaStorage.getStore()?.empresaId
}
