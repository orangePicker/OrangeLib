import { myHttp } from "../../utils/interceptors";

export interface bookType {
  id: number;
  bookTitle: string;
  author?: string;
  lendState: number;
}

export const addBookApi = (data: {
  bookTitle: string;
  author?: string;
  lendState?: number;
}) => myHttp("book/addBook", data);

export const editBookApi = (data: { bookTitle: string; author?: string }) =>
  myHttp("book/editBook", data);

export const deleteBookApi = (data: { bookTitle: string }) =>
  myHttp("book/deleteBook", data);

export const queryBookApi = (data: {
  bookTitle: string;
  author?: string;
  lendState?: number | string;
}) => myHttp<{ books: bookType[]; total: number }>("book/queryBooks", data);
