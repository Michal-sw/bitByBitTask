import axios, { Axios, AxiosResponse } from "axios";
import { BookDT } from "../core/types/BookDT";

const apiPath = process.env.REACT_APP_API_PATH ?? 'https://fakerapi.it/api/v1';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const getBooks = async () => {
    return axiosInstance.get(`${apiPath}/books`);
}

const getBookById = async (id: string) => {
    return axiosInstance.get(`${apiPath}/books/${id}`);
}

const updateBook = async (id: string, values: BookDT) => {
    return axiosInstance.patch(`${apiPath}/books/${id}`, { ...values });
}

const postBook = async (values: BookDT) => {
    return axiosInstance.post(`${apiPath}/books/`, { ...values });
}

const deleteBook = async (id: string) => {
    return axiosInstance.delete(`${apiPath}/books/${id}`);
}

interface AxiosService {
    axiosInstance: Axios,
    getBooks: () => Promise<AxiosResponse>,
    getBookById: (id: string) => Promise<AxiosResponse>,
    updateBook: (id: string, values: any) => Promise<AxiosResponse>,
    postBook: (values: any) => Promise<AxiosResponse>,
    deleteBook: (id: string) => Promise<AxiosResponse>,
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