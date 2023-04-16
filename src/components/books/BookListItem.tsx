import React, { SyntheticEvent, memo } from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";

interface BookListItemProps {
    title: string;
    id?: number;
    deleteBook: any;
}

const BookListItem = memo(({ id, title, deleteBook }: BookListItemProps) => {
    const navigate = useNavigate();

    const handleDelete = (event: SyntheticEvent) => {
        event.stopPropagation();
        if (id) deleteBook(id);
    };

    return (
        <ListItem className="list-item">
            <ListItemButton
                onClick={() => navigate(`/books/${id}`)}
            >
                <ListItemText primary={title}/>
                <ListItemIcon>
                    <DeleteForeverIcon
                        className="delete-icon"
                        onClick={handleDelete}
                    />
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
})

export default BookListItem;