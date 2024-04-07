import { parse} from 'node:url';
import { DEFAULT_HEADER } from './util/util.js';
import { routes } from "./routes/heroRoute.js";

const heroRoutes = routes({
    heroService: {}
});
const allRoutes = {
    ...heroRoutes,
    default: async (req, res) => {
        res.writeHead(404, DEFAULT_HEADER);
        res.end();
    }
}

function heandler(req, res) {
    const { url, method } = req;
    const { pathname } = parse(url, true);
    const key = `${pathname}:${method.toLowerCase()}`;
    const chosen = allRoutes[key] || allRoutes.default;
    
    return Promise
        .resolve(chosen(req, res))
        .catch(handlerError(res));
}

function handlerError(res) {
    return error => {
        res.writeHead(500, DEFAULT_HEADER);
        res.write(JSON.stringify({ 
            error: error.message,
            stack_trace: error.stack,
        }));
        res.end();
    }
}

export default heandler;
