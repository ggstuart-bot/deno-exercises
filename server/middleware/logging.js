export async function withLogs(ctx, next) {
    const { url, request } = ctx;
    console.log("\n============================");
    console.log(`${request.method} ${url.pathname}`);
    const response = await next(ctx);
    console.log("SESSION", ctx.session);    
    if (ctx.flash) console.log("[flash sent]", ctx.flash);
    if (ctx.data.flash) console.log("[flash received]", ctx.data.flash);
    console.log("RESPONSE", response.status);
    console.log("============================");

    return response;
}
