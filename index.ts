import { WebSocketServer } from "ws";
import http from "http";

const PORT = Number(process.env.PORT) || 3000;
const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, request) => {
  const ip = request.socket.remoteAddress;
  console.log(`🟢 Novo cliente conectado! IP: ${ip}`);

  ws.on("message", (message) => {
    console.log(`📩 Mensagem recebida de ${ip}: ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => console.log(`🔴 Cliente ${ip} desconectado`));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor WebSocket rodando na porta ${PORT}...`);
});
