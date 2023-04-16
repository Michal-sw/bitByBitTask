import { useParams } from "react-router-dom";
import useBooks from "../../core/providers/BooksContext";
import { useEffect, useState } from "react";
import { BookDT } from "../../core/types/BookDT";
import Header from "../commons/Header";
import { Box, TextField } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

const BookDetails = () => {
    const { id } = useParams();
    const { books, isPreloaded } = useBooks();
    const [book, setBook] = useState<BookDT|undefined>(undefined);

    useEffect(() => {
        setBook(books.find(b => b.id === Number(id)));
    }, [id, books.length]);

    return (
        isPreloaded && book?.id 
        ?
            <Box id='book-detail-container'>
                <Header>{book.title}</Header>
                <TextField
                    label="Author ID"
                    defaultValue={book.author_id}
                    InputProps={{readOnly: true}}
                    variant="standard"
                />

                <TextField
                    label="Release Date"
                    defaultValue={book.releaseDate}
                    InputProps={{readOnly: true}}
                    variant="standard"
                />

                <TextField
                    label="Pages"
                    defaultValue={book.pages}
                    InputProps={{readOnly: true}}
                    variant="standard"
                />
                <LockIcon fontSize="large" className="lock-icon"/>
            </Box>

        : <div>Not found</div>
        
    )
}

export default BookDetails;