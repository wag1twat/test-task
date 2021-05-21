import { User } from "hooks/useUsers";

interface UserResponse {
  data: User;
  support: {
    url: string;
    text: string;
  };
}

export type { UserResponse };
