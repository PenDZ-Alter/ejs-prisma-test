import express from 'express';
import { authMiddleware } from '../middleware/auth';
import type { AuthRequest } from '../middleware/auth';
import * as UserService from '../services/user.services';

const router = express.Router();

// Semua route di-protect
router.use(authMiddleware);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const users = await UserService.listUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error founded!");
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!", detail: error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await UserService.getUser(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.log("Error founded!");
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!", detail: error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    const user = await UserService.editUser(id, name, email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', detail: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await UserService.deleteUser(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', detail: error });
  }
});

export default router;