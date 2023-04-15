import { createContext, ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { BookDT } from "../types/BookDT";
import bookService from "../../services/bookService";

interface BookContextType {
    books: BookDT[];
    addBook: (book: BookDT) => void;
    editBook: (book: BookDT) => void;
    deleteBook: (id: number) => void;
}

const BookContext = createContext<BookContextType>(
    {} as BookContextType
);

export function BooksProvider({ children }: {children: ReactElement }) {
    console.log('BooksProvider Rendered');
    const [books, setBooks] = useState<BookDT[]>([]);
    const [editCounter, setEditCounter] = useState<number>(0);

    useEffect(() => {
        bookService
            .getBooks()
            .then(res => {
                if (!res.data.length) return;
                setBooks(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    function addBook(book: BookDT) {
        setBooks([...books, book]);
    }

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
            }).catch(err => console.log(err));
    }

    function deleteBook(id: number) {
        bookService
            .deleteBook(id)
            .then(res => {
                if (res.status !== 200) return;
                setBooks(books.filter(act => act.id !== id));
            }).catch(err => console.log(err));
    }

    const memoedValue = useMemo(
        () => ({
        books,
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