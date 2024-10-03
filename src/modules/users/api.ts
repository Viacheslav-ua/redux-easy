import { baseApi } from "../../shared/api";
import { User } from "./users.slice";

export const usersApi =baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<User[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetUsersQuery } = usersApi