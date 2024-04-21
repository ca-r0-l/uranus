import test from "node:test";
import assert from "node:assert";
const callTracker = new assert.CallTracker();
process.on('exit', () => callTracker.verify());

import { routes } from "../../../src/routes/heroRoute.js";
import { DEFAULT_HEADER } from "../../../src/util/util.js";

test("Hero routes - endpoint test suite", async (t) => {
	await t.test("it should call /heroes:get endpoint", async () => {
		const databaseMock = [
			{
				id: "90bf10a3-c9fb-406a-a35a-3e4a8db0fbf8",
				name: "Batman",
				age: 50,
				power: "rich",
			},
		];
        const heroServiceStub = {
            find: async () => databaseMock,
        };

        const endpoints = routes({
            heroService: heroServiceStub,
        })

        const endpoint = '/heroes:get'
        const req = {}
        const res = {
            write: callTracker.calls(item => {
                const expected = JSON.stringify(databaseMock)
                assert.strictEqual(item, expected, 'write should be called with the correct payload')
            }),
            end: callTracker.calls(item => {
                assert.strictEqual(item, undefined, 'end should be called without arguments')
            }),
            writeHead: callTracker.calls((statusCode, headers) => {
                assert.strictEqual(statusCode, 200, 'writeHead should be called with status code 200')
                assert.deepStrictEqual(headers, DEFAULT_HEADER, 'writeHead should be called with the correct headers')
            }),
        }
        const route = endpoints[endpoint]
        await route(req, res)
	});

	await t.test("it should call /heroes:post endpoint", async () => {
        const databaseMock = [
			{
				id: "90bf10a3-c9fb-406a-a35a-3e4a8db0fbf8",
				name: "Batman",
				age: 50,
				power: "rich",
			},
		];
        const heroServiceStub = {
            create: async (data) => databaseMock,
        };

        const endpoints = routes({
            heroService: heroServiceStub,
        })

        const endpoint = '/heroes:post'
        const req = {
            data: JSON.stringify(databaseMock),
        }
        const res = {
            onde: callTracker.calls(item => {
                assert.strictEqual(true, true)
            }),
            create: callTracker.calls(item => {
                const expected = JSON.stringify(databaseMock)
                assert.strictEqual(true, true)
            }),
            write: callTracker.calls(item => {
                const expected = JSON.stringify(databaseMock)
                assert.strictEqual(item, expected, 'write should be called with the correct payload')
            }),
            end: callTracker.calls(item => {
                assert.strictEqual(item, undefined, 'end should be called without arguments')
            }),
            writeHead: callTracker.calls((statusCode, headers) => {
                assert.strictEqual(statusCode, 201, 'writeHead should be called with status code 201')
                assert.deepStrictEqual(headers, DEFAULT_HEADER, 'writeHead should be called with the correct headers')
            }),
        }
        const route = endpoints[endpoint]
        await route(req, res)
    });
});
