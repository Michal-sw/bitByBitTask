import { createContext, ReactElement, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BookDT } from "../types/BookDT";
import bookService from "../../services/bookService";

interface BookContextType {
    books: BookDT[];
    isPreloaded: boolean;
    addBook: (book: BookDT) => void;
    editBook: (book: BookDT) => void;
    deleteBook: (id: number) => void;
}

const BookContext = createContext<BookContextType>(
    {} as BookContextType
);

export function BooksProvider({ children }: {children: ReactElement }) {
    const [books, setBooks] = useState<BookDT[]>([]);
    const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
    const [editCounter, setEditCounter] = useState<number>(0);

    useEffect(() => {
        bookService
            .getBooks()
            .then(res => {
                if (!res.data.length) return;
                setBooks(res.data);
                setIsPreloaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    const addBook = useCallback((book: BookDT) => {
        setBooks((prevBooks) => [...prevBooks, {
            ...book,
            id: Math.floor(Math.random() * 90 + 10)
        }]);
    }, [])

    function editBook(newBook: BookDT) {
        if (!newBook.id) return;
        bookService
            .updateBook(newBook.id, newBook)
            .then(res => {
                if (res.status !== 200) return;
                setBooks(books
                    .map(act => act.id === newBook.id ? newBook : act)
                );
                setEditCounter(editCounter+1)
            }).catch(err => {
                console.log(err);
                console.log("API failed but book updated");
                setBooks(books
                    .map(act => act.id === newBook.id ? newBook : act)
                );
                setEditCounter(editCounter+1)
            });
    }

    const deleteBook = useCallback((id: number) => {
        setBooks((book) => book.filter(act => act.id !== id));
        bookService
            .deleteBook(id)
            .then(res => {
                if (res.status !== 200) return;
            }).catch(err => console.log(err));
    },[]);

    const memoedValue = useMemo(
        () => ({
            books,
            isPreloaded,
            addBook,
            editBook,
            deleteBook,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [books.length, editCounter]
    );

    return (
        <BookContext.Provider value={memoedValue}>
            {children}
        </BookContext.Provider>
    );
}

export default function useBooks() {
    return useContext(BookContext);
}