import React from "react";
import useBooks from "../../core/providers/BooksContext";

const BookList = () => {
    const { books } = useBooks();

    return (
        <div>
            <h1>Book List</h1>
                <div id='container'>
                    {books.map((book) =>
                        <p
                            key={book.id}
                        >{book.author}</p>
                    )}
                </div>
        </div>
    );
}

export default BookList;