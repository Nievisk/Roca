type CategoryTye = "music" | "games" | "movies & series" | "other" | "animes" | "art"

export interface SearchContent {
    category?: CategoryTye;
    text?: string;
    page?: number;
}