export interface BookDT {
    id?: number;
    author_id: number;
    title: string;
    cover_image?: string;
    pages?: number;
    releaseDate?: string;
    isbn?: string;
}
