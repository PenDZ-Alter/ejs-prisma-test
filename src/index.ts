import express from 'express';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import uploadRoutes from './routes/upload';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use('/upload', uploadRoutes);

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Hello, This is using Express + Prisma + TypeScript + JWT!');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
