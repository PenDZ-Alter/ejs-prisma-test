import { db } from '../utils/db.server';
import type { Post } from '../utils/types';

export const listPosts = async (): Promise<Post[]> => {
  return db.post.findMany(
    {
      include: {
        author: {
          select: {
            id: false,
            email: false,
            name: true
          }
        }
      }
    }
  );
}

export const getPost = async (id: number): Promise<Post | null> => {
  return db.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: false,
          email: false,
          name: true
        }
      }
    }
  });
}

export const createPost = async (title: string, content: string, userId: number): Promise<Post> => {
  return db.post.create({
    data: {
      title,
      content,
      author: {
        connect: { id: userId }
      }
    }
  });
}

export const editPost = async (id: number, title: string, content: string): Promise<Post> => {
  return db.post.update({
    where: { id },
    data: { title, content }
  });
}

export const deletePost = async (id: number): Promise<Post> => {
  return db.post.delete({
    where: { id }
  });
}