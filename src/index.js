import http from 'node:http';
import heandler from "./handler.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(heandler).listen(PORT, () => console.log(`Server running on port ${PORT}`));

export {
    server
};
