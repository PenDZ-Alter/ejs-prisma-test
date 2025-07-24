import express from 'express';
import { upload } from '../middleware/upload';
import { db } from '../utils/db.server';
import { ensureUploadFolder } from '../middleware/ensureUploadFolder';

const router = express.Router();

router.post('/file', ensureUploadFolder, upload.single('file'), async (req, res) => {
  const { id } = req.body;
  const id_user = Number(id);
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const post = await db.post.update({
      where: { id: id_user },
      data: {
        file: file.path,
      },
    });

    res.json({ message: 'File uploaded', data: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;