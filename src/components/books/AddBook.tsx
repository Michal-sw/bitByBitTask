import useBooks from "../../core/providers/BooksContext";
import { BookDT } from "../../core/types/BookDT";
import { Box, Button } from "@mui/material";
import { ErrorOption, useForm } from "react-hook-form";
import FormInputText from "../commons/FormInputText";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const { addBook } = useBooks();
    const { handleSubmit, control, setError, formState: {errors}, clearErrors } = useForm();
    const navigate = useNavigate();

    const onAdd = (event: SyntheticEvent) => {
        event.preventDefault();
        submitData()
            .then(() => {
                clearErrors();
            })
            .catch((e) => null);
    }
    

    const submitData = handleSubmit(
        (data) => {
            addBook(data as BookDT);
            navigate("/books");
        },
        (formErrors) => {
            for (const name in formErrors) {
                setError(name, {
                    type: formErrors[name]?.type,
                    message: formErrors[name]?.message
                } as ErrorOption);
            }
            throw new Error("Validation error");
        }
    );
    
    return (
            <form onSubmit={onAdd}>
                <Box id='book-detail-container'>
                    
                    <FormInputText
                        name={"title"}
                        control={control}
                        label={"Title"}
                        defaultValue={""}
                        errors={errors}
                        rules={{ required: "required", maxLength: {value: 6, message: "Length should be < 6"} }}
                    />

                    <FormInputText
                        name={"author_id"}
                        control={control}
                        label={"Author ID"}
                        defaultValue={""}
                        errors={errors}
                        rules={{
                            required: "required",
                            maxLength: {value: 2, message: "Provide number lower than 100"},
                            pattern: {value: /^[1-9]$|^[1-9][0-9]$/, message: "Provide valid number"}
                        }}
                    />

                    <FormInputText
                        name={"releaseDate"}
                        control={control}
                        label={"Releases Date"}
                        defaultValue={""}
                        errors={errors}
                        rules={{
                            required: "required",
                            pattern: {value: /^[1-2][0-9][0-9][0-9]$/, message: "Valid range: 1000 - 2999"}
                        }}
                    />

                    <FormInputText
                        name={"pages"}
                        control={control}
                        label={"Pages"}
                        defaultValue={""}
                        errors={errors}
                        rules={{
                            pattern: {value: /\d+/, message: "Digits only"}
                        }}
                    />

                    <Button 
                        type="submit" 
                        variant="contained"
                        sx={{mt: 2, alignSelf: 'center'}}
                    >
                        SUBMIT
                    </Button>

                </Box>
            </form>
    )
}

export default AddBook;