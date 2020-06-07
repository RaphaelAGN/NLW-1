//milha extra
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            //número de bytes aleatórios e conversão para string hexadecimal
            const hash = crypto.randomBytes(6).toString('hex');

            //hash + nome original do arquivo
            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    }),
};