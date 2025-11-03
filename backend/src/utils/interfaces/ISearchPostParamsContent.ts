type CategoryTye = "music" | "games" | "movies&series" | "other" | "animes" | "art"

export interface ISearchPostParamsContent {
    category?: CategoryTye;
    title?: string;
    page?: number;
}