import React from "react";
import useBooks from "../../core/providers/BooksContext";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { BookDT } from "../../core/types/BookDT";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface BookListItemProps {
    book: BookDT;
}

const BookListItem = ({ book }: BookListItemProps) => {
    const { deleteBook } = useBooks();

    const handleDelete = () => {
        if (book.id) deleteBook(book.id);
    }

    return (
        <ListItem 
            key={book.id} className="list-item">
            <ListItemButton>
                <ListItemText primary={book.title}/>
                <ListItemIcon>
                    <DeleteForeverIcon 
                        className="delete-icon"
                        onClick={handleDelete}
                    />
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    );
}

export default BookListItem;