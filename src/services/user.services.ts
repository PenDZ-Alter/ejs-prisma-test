import { db } from "../utils/db.server";

type User = {
  id: number,
  name: string,
  email: string
}

export const listUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  });
}

export const getUser = async (id: number): Promise<User|null> => {
  return db.user.findUnique({
    where: { id }
  });
}

export const editUser = async (id: number, name: string, email: string): Promise<User|null> => {
  return db.user.update({
    where: { id },
    data: {name, email}
  });
}

export const deleteUser = async (id: number): Promise<User|null> => {
  return db.user.delete({
    where: { id }
  });
}