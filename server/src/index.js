import { server, io } from "./server.js";
import { registerSocketHandlers } from "./socket/handlers.js";

const PORT = process.env.PORT || 3000;

registerSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
