import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";

/**
 * Multer storage config
 * Determines where files will be stored
 */
export const multerStorage = (folder: string) =>
  diskStorage({
    destination: `./src/modules/uploads/${folder}`, // uploads/team OR uploads/cv

    filename: (req, file, callback) => {
      /**
       * Unique filename generate
       * Example:
       * team-171234123.jpg
       */

      const uniqueSuffix = Date.now();

      const ext = extname(file.originalname); // .jpg / .pdf

      const filename = `${folder}-${uniqueSuffix}${ext}`;

      callback(null, filename);
    },
  });

/**
 * Image validation
 */
export const imageFileFilter = (req, file, callback) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const ext = extname(file.originalname).toLowerCase();

  if (!allowedTypes.test(ext)) {
    return callback(
      new BadRequestException('Only image files are allowed'),
      false,
    );
  }

  callback(null, true);
};

/**
 * CV validation
 */
export const cvFileFilter = (req, file, callback) => {
  const allowedTypes = /pdf|doc|docx/;

  const ext = extname(file.originalname).toLowerCase();

  if (!allowedTypes.test(ext)) {
    return callback(
      new BadRequestException('Only PDF or Word files are allowed'),
      false,
    );
  }

  callback(null, true);
};