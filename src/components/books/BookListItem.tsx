import React, { memo } from "react";
import useBooks from "../../core/providers/BooksContext";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { BookDT } from "../../core/types/BookDT";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface BookListItemProps {
    title: string;
    id?: number;
    deleteBook: any;
}

const BookListItem = memo(({ id, title, deleteBook }: BookListItemProps) => {

    const handleDelete = () => {
        if (id) deleteBook(id);
    }

    console.log("BookListItem Rendered ", id, " ", title);
    return (
        <ListItem className="list-item">
            <ListItemButton>
                <ListItemText primary={title}/>
                <ListItemIcon>
                    <DeleteForeverIcon 
                        className="delete-icon"
                        onClick={handleDelete}
                    />
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    );
})

export default BookListItem;