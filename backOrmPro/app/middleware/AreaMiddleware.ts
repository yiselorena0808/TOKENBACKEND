import type { HttpContext } from '@adonisjs/core/http'
import TenantStorage from '#services/TenantStorage'



export default class areaMiddleware{
 async handle({ request, response }: HttpContext, next: () => Promise<void>) {
  const tenantId = Number(request.header('x-area-id'))

  if (!tenantId) {
    return response.badRequest({ error: 'Area ID is r0equired in headers' })
  }

  try {
    TenantStorage.setTenantId(tenantId)
  } catch {
    return response.internalServerError({
      error: 'El tenant context no se inició (el tenant Empresa debe ejecutarse primero)',
    })
  }

  ;(request as any).tenantId = tenantId
  await next()
}
}