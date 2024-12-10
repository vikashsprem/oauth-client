import fs from 'fs';
import path from 'path';

const TOKEN_DIR = path.join(__dirname, '../tokens');

if (!fs.existsSync(TOKEN_DIR)) {
    fs.mkdirSync(TOKEN_DIR);
}

export default {
    saveToken(key, value) {
        const filePath = path.join(TOKEN_DIR, `${key}.json`);
        fs.writeFileSync(filePath, JSON.stringify(value), 'utf8');
    },
    getToken(key) {
        const filePath = path.join(TOKEN_DIR, `${key}.json`);
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        return null;
    },
};
