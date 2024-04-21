import {
    readFile,
    writeFile,
} from 'node:fs/promises';

export default class HeroRepository {
    constructor(
        {
            file
        }
    ) {
        this.file = file;
    }

    async #currentFileContent() {
        return JSON.parse(
            await readFile(this.file)
        );
    }

    async find() {
        return this.#currentFileContent();
    }

    async create(data) {
        const currentFile = await this.#currentFileContent();
        currentFile.push(data);

        await writeFile(this.file, JSON.stringify(currentFile));

        return data.id;
    }
}

/*para testar o repositorio
const heroRepository = new HeroRepository({
    file: '../database/data.json'
});

console.log(
    await heroRepository.create({
        id: 134234,
        name: 'Flash Reverso',
        power: 'Speed',
        age: 22
    })
);

console.log(
    await heroRepository.find()
) */