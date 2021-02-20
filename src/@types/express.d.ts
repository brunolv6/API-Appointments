// adicionar algo numa interface definida em uma biblioteca

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
