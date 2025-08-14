import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import multer, { diskStorage } from "multer";
import * as path from "node:path"

export const multerConst: MulterOptions = {
    storage: diskStorage({
        destination(req, file, callback) {
            const folderPath = path.join(process.cwd(), "public/uploads");
            return callback(null, folderPath)
        },
        filename(req, file, callback) {
            const time = Date.now().valueOf();
            const randomNumber = Math.round(Math.random() * 1000);
            const fileName = `${time}-${randomNumber}-${path.extname(file.originalname)}`;
            return callback(null, fileName)
        },
    }),
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter(req: any, file, callback) {
        if (file && ![".png", ".jpeg", ".jpg", ".gif"].includes(path.extname(file.originalname)))
            return callback(new BadRequestException("File does not match allowd exts .jpg/jpeg/png"), false);
        return callback(null, true);
    },
}