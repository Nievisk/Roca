export interface FindCommentsQuery {
    postId: number;
    page: number;
    parentId?: number;
}