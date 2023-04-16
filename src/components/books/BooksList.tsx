import React from "react";
import './Books.scss';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';import useBooks from "../../core/providers/BooksContext";
import { Box, Button, CircularProgress, List } from "@mui/material";
import BookListItem from "./BookListItem";
import { useNavigate } from "react-router-dom";
import Header from "../commons/Header";

const BookList = () => {
    const { books, deleteBook, isPreloaded } = useBooks();
    const navigate = useNavigate();

    return (
        <Box id='book-list-container' sx={{ boxShadow: 10 }}>
            <Header>Book List</Header>
            <Button
                sx={{ mt: 2, mb: 2}}
                endIcon={<AddOutlinedIcon/>}
                variant="contained"
                onClick={() => navigate('/books/add')}
            >
                ADD
            </Button>
            {
                isPreloaded
                    ?
                        <List id='books-list'>
                            {books.map((book) =>
                                <BookListItem
                                    key={book.id}
                                    title={book.title}
                                    id={book.id}
                                    deleteBook={deleteBook}
                                />
                            )}
                        </List>
                    :  <CircularProgress sx={{mt: 2, mb: 2}}/>
            }

        </Box>
    );
}

export default BookList;