import multer from "multer";
import fs from 'fs';
import path from 'path';

const defaultPath = 'public';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const childDirectory = file.mimetype.split('/')[0]; // 'image' or 'application', etc.
        const targetDirectory = path.join(defaultPath, childDirectory);

        if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory, { recursive: true });
        }
        
        cb(null, targetDirectory);
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    const formatAccepted = ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'];
    const fileExtension = path.extname(file.originalname).slice(1);

    if (formatAccepted.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('File Format Not Accepted!'));
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
