import { currentSession } from "../tools/auth.js";

export function withSession(ctx, next) { 
    ctx.session = currentSession(ctx);    
    return next(ctx);
}