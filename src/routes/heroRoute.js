import { once } from 'node:events';
import { DEFAULT_HEADER } from '../util/util.js';
import Hero from '../entities/hero.js';

const routes = ({
    heroService
}) => ({
    '/heroes:get': async (req, res) => {
        res.writeHead(200, DEFAULT_HEADER);
        return res.end('GET');
    },
    '/heroes:post': async (req, res) => {
        const data = await once(req, 'data');
        const item = JSON.parse(data);
        const hero = new Hero(item);

        const id = hero.id;
        res.writeHead(201, DEFAULT_HEADER);
        res.write(JSON.stringify(
            {
                id,
                success: 'Hero created with success'
            }
        ))
        return res.end();
    },
});

export {
    routes
}
