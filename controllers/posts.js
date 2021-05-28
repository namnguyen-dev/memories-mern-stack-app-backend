import mongoose from 'mongoose';
import PostMessage from '../model/postMessage.js';

export const getPosts = async (req, res) => {
  console.log('getPosts');

  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  console.log(createPost);
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  console.log(updatePost);
  const { id: _id } = req.params;
  const post = req.body;
  console.log(_id);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id');
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  console.log(deletePost);
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  try {
    await PostMessage.findByIdAndRemove(id);
    res.status(201).json({ message: 'Post successfully deleted' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  console.log(likePost);

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  try {
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
