import express from 'express';
import * as PostService from '../services/post.services';

const router = express.Router();

router.get('/', async (req, res) => {
  try { 
    const posts = await PostService.listPosts();
    return res.status(200).json(posts);
  } catch (err) {
    console.log("Error founded!");
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!", detail: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = await PostService.getPost(id);
    return res.status(200).json(post);
  } catch (err) {
    console.log("Error founded!");
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!", detail: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, user_id } = req.body;
    const post = await PostService.createPost(title, content, user_id);
    return res.json({ message: "Post created!", post: { id: post.id, title: post.title, content: post.content, userId: post.userId } });
  } catch (err) {
    console.log("Error founded!");
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!", detail: err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const post = await PostService.editPost(id, title, content);
    return res.json({ message: "Post Updated!!", post: { id: post.id, title: post.title, content: post.content } });
  } catch (err) {
    console.log("Error founded!");
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!", detail: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = await PostService.deletePost(id);
    return res.json({ message: "Post Deleted!!", id: post.id });
  } catch (err) {
    console.log("Error founded!");
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!", detail: err });
  }
});

export default router;