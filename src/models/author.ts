export interface Author {
  id: number;
  name: string;
  birth_date: string;
}

export interface AuthorCreateBody {
  name: string;
  birth_date: string;
}

export interface AuthorUpdateBody {
  name: string | null;
  birth_date: string | null;
}
