import { readFile  } from 'fs/promises';
import { FirestoreIndexConfig } from '../firestore/types/firestore-index-config.types';

export async function configParser(filePath: string) {
    const data = await readFile(filePath, 'utf8');
    const config = JSON.parse(data);

    return config as FirestoreIndexConfig;
}
