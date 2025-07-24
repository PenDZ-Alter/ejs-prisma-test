import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};

export const multerErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    // Error dari multer sendiri (misalnya limit file, dsb)
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // Error dari custom fileFilter atau lainnya
    return res.status(400).json({ error: err.message || 'Upload error' });
  }

  next(); // lanjut ke middleware berikutnya kalau gak ada error
};
