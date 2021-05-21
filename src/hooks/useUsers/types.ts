interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

interface UsersResponse {
  data: User[];
  page: number;
  per_page: number;
  support: {
    url: string;
    text: string;
  };
  total: number;
  total_pages: number;
}

export type { User, UsersResponse };
