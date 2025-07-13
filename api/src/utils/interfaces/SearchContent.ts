type CategoryTye = "Music" | "Games" | "Movies & series" | "Other" | "Animes" | "Art"

export interface SearchContent {
    category: CategoryTye;
    text?: string;
    page?: number;
    find: "title" | "any"
}