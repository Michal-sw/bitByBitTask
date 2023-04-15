import React from "react";
import './Books.scss';
import useBooks from "../../core/providers/BooksContext";
import { Box, CircularProgress, List, Typography } from "@mui/material";
import BookListItem from "./BookListItem";

const BookList = () => {
    const { books } = useBooks();

    return (
        <Box id='book-list-container' sx={{ boxShadow: 10 }}>
            <Typography
                sx={{ mt: 2 }}
                variant="h3"
            >
                Book List
            </Typography>
            {
                books.length !== 0 
                    ?
                        <List id='books-list'>
                            {books.map((book) =>
                                <BookListItem
                                    key={book.id}
                                    book={book}
                                />
                            )}
                        </List>
                    : <CircularProgress sx={{mt: 2, mb: 2}}/>
            }

        </Box>
    );
}

export default BookList;