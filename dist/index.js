import { WebSocketServer } from "ws";
import http from "http";
const server = http.createServer();
const wss = new WebSocketServer({ server });
wss.on("connection", (ws, request) => {
    const ip = request.socket.remoteAddress;
    console.log(`🟢 Novo cliente conectado! IP: ${ip}`);
    ws.on("message", (message) => {
        console.log(`📩 Mensagem recebida de ${ip}: ${message}`);
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(message.toString());
            }
        });
    });
    ws.on("close", () => console.log(`🔴 Cliente ${ip} desconectado`));
});
server.listen(3000, "0.0.0.0", () => {
    console.log("🚀 Servidor WebSocket rodando na porta 3000...");
});
