import { useParams } from "react-router-dom";
import useBooks from "../../core/providers/BooksContext";
import { useEffect, useRef, useState } from "react";
import { BookDT } from "../../core/types/BookDT";
import Header from "../commons/Header";
import { Box, CircularProgress } from "@mui/material";
import StatefulLock from "../commons/StatefulLock";
import { ErrorOption, useForm } from "react-hook-form";
import FormInputText from "../commons/FormInputText";

const BookDetails = () => {
    const { id } = useParams();
    const { books, isPreloaded, editBook } = useBooks();
    const [book, setBook] = useState<BookDT|undefined>(undefined);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const firstInput = useRef<any>(null);

    const { handleSubmit, control, setError, formState: {errors}, clearErrors } = useForm();
    useEffect(() => {
        setBook(books.find(b => b.id === Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, books.length]);

    const handleLockClick = (isLocked: boolean) => {
        if (!isLocked) {
            firstInput.current.focus();
            setIsReadOnly(isLocked);
        } else {
            submitData()
                .then(() => {
                    setIsReadOnly(isLocked)
                    clearErrors();
                })
                .catch((e) => null);
        }
    }

    const submitData = handleSubmit(
        (data) => {
            editBook({...book, ...data} as BookDT);
            setBook({...book, ...data} as BookDT);
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
        book?.id
        ?
            <form>
                <Box id='book-detail-container'>
                    <StatefulLock
                        isLocked={isReadOnly}
                        setIsLocked={handleLockClick}
                    />

                    {isReadOnly 
                        ?   <Header>{book.title}</Header> 
                        :   <FormInputText
                                name={"title"}
                                control={control}
                                label={"Title"}
                                defaultValue={book.title}
                                errors={errors}
                                rules={{ required: "required", maxLength: {value: 6, message: "Length should be < 6"} }}
                            />
                    }

                    <FormInputText
                        inputRef={firstInput}
                        name={"author_id"}
                        control={control}
                        label={"Author ID"}
                        defaultValue={book.author_id}
                        isReadOnly={isReadOnly}
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
                        defaultValue={book.releaseDate}
                        isReadOnly={isReadOnly}
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
                        defaultValue={book.pages}
                        isReadOnly={isReadOnly}
                        errors={errors}
                        rules={{
                            pattern: {value: /\d+/, message: "Digits only"}
                        }}
                    />

                </Box>
            </form>
        : isPreloaded ? <div>Not found</div> : <CircularProgress/>
        
    )
}

export default BookDetails;