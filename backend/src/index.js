import express from 'express';
import cors from 'cors';

import { getPosts, newPost } from './modules/querys.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('http://localhost:5173');
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (invokeFuncError) {
    console.error(
      `There was an error invoking get posts function: ${invokeFuncError}`
    );
    res.status(500).json({
      ok: false,
      error: invokeFuncError,
      msg: 'There was an error invoking get posts function',
    });
  }
});

app.post('/posts', async (req, res) => {
  const { title, img, description, likes } = req.body;

  try {
    await newPost(title, img, description, likes);
    res.status(200).json({
      ok: true,
      msg: 'New post added successfully',
    });
  } catch (invokeFuncError) {
    console.error(
      `There was an error invoking new post function: ${invokeFuncError}`
    );
    res.status(500).json({
      ok: false,
      error: invokeFuncError,
      msg: 'There was an error invoking new post function',
    });
  }
});

app.listen(PORT, console.log(`Server running on port: ${PORT}`));
