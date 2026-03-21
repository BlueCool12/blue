export interface FeedbackCategoryResponse {
    id: number;
    name: string;
}

export interface FeedbackRequest {
    categoryId: number;
    content: string;
    pageUrl: string;
}
