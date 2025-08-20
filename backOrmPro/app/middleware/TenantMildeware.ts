import  {Request, Response, NextFunction} from 'express';
import TenantStorage from '../services/TenantStorage.js';

export function tenantMiddleware(req: Request, _res: Response, next: NextFunction) {
    const tenantId = Number(req.headers['x-area-id']) || 0;
    const empresaId = Number(req.headers['x-empresa-id']) || 0;

    TenantStorage.run(tenantId, () => {
        next();
    });

    TenantStorage.run(empresaId, () => {
        next();
    });
}