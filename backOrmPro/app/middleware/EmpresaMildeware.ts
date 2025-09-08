import type { HttpContext } from '@adonisjs/core/http'
import TenantStorage from '#services/TenantStorage'


export default class empresaMiddleware{
 async handle({ request, response }: HttpContext, next: () => Promise<void>) {
  const empresaId = Number(request.header('x-empresa-id'))

  if (!empresaId) {
    return response.badRequest({ error: 'Empresa ID is required in headers' })
  }

  TenantStorage.run({ empresaId }, async () => {
    ;(request as any).empresaId = empresaId
    await next()
  })
}
}

