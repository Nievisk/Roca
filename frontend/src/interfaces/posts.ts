interface Post {
    id: number;
    ctegory: string;
    User: { username: string },
    image: null,
    text: string,
    title: string;
    createdAt: number;
}

export interface PostData {
    posts: Post[],
    page: number;
    total_pages: number,
    total_posts: number
}