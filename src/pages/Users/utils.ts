import { User } from "hooks/useUsers";

export type UsersFilters = Record<keyof Omit<User, "id" | "avatar">, string>;

export const filterUsersBySubstring = (
  users: User[],
  filters: UsersFilters
) => {
  return users.filter((user) => {
    const keys = Object.keys(filters) as Array<keyof typeof filters>;

    return keys.some((key) => user[key].match(new RegExp(filters[key], "i")));
  });
};
