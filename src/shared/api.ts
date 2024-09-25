import { z } from "zod";

const baseUrl = "http://localhost:3000";

const userDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export const api = {
  getUsers: () => {
    return fetch(`${baseUrl}/users`).then((res) => res.json()).then((users) => {
      return userDtoSchema.array().parse(users);
    });
  },

  getUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`).then((res) => res.json()).then((user) => {
      return userDtoSchema.parse(user);
    });
  },

  deleteUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },
};

