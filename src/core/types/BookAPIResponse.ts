import { BookDT } from "./BookDT";

export interface BookApiResponseDT {
    status: string;
    code: number;
    total: number;
    data?: [BookDT];
}
