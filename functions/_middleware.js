export const onRequest = async (context) => {
    const response = await context.next();
    response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');

    return response;
};
