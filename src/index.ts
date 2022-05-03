import { configParser } from "./utils/config-parser";

async function main() {
    const file = './firestore.indexes.json';
    const config = await configParser(file);

    console.log(config);
}

void main();