export async function withLogs(ctx, next) {
    const { url, request } = ctx;
    console.log("\n============================");
    console.log(`${request.method} ${url.pathname}`);    
    const response = await next(ctx);
    console.log("RESPONSE", response.status);
    console.log("============================");
    
    return response;
}