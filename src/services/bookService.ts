import axios, { Axios, AxiosResponse } from "axios";
import { BookDT } from "../core/types/BookDT";

const apiPath = process.env.REACT_APP_API_PATH ?? 'https://my-json-server.typicode.com/dmitrijt9/book-api-mock';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
});

const getBooks = async () => {
    return axiosInstance.get(`${apiPath}/books`);
}

const getBookById = async (id: number) => {
    return axiosInstance.get(`${apiPath}/books/${id}`);
}

const updateBook = async (id: number, values: BookDT) => {
    return axiosInstance.patch(`${apiPath}/books/${id}`, { ...values });
}

const postBook = async (values: BookDT) => {
    return axiosInstance.post(`${apiPath}/books/`, { ...values });
}

const deleteBook = async (id: number) => {
    return axiosInstance.delete(`${apiPath}/books/${id}`);
}

interface AxiosService {
    axiosInstance: Axios,
    getBooks: () => Promise<AxiosResponse<[BookDT]>>,
    getBookById: (id: number) => Promise<AxiosResponse<[BookDT]>>,
    updateBook: (id: number, values: any) => Promise<AxiosResponse<[BookDT]>>,
    postBook: (values: any) => Promise<AxiosResponse<[BookDT]>>,
    deleteBook: (id: number) => Promise<AxiosResponse<[BookDT]>>,
};

const axiosService: AxiosService = {
    axiosInstance,
    getBooks,
    getBookById,
    updateBook,
    postBook,
    deleteBook,
};

export default axiosService;