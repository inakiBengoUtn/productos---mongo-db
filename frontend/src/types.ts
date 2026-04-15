/** UI model — used by all React components */
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    availability: boolean;
    imageUrl: string;
    category: string;
    features: string[];
    details: Record<string, unknown>;
}

/** Maps to ProductResponse DTO returned by Spring Boot */
export interface ProductResponse {
    id: string;
    name: string;
    price: number;
    stock: number;
    details: Record<string, unknown>;
}

/** Maps to ProductFilterRequest DTO in Spring Boot */
export interface ProductFilterRequest {
    name?: string;
    minPrice?: number;
    stock?: number;
    active?: boolean;
}

/** Maps to CreateProductRequest DTO in Spring Boot */
export interface CreateProductRequest {
    name: string;
    price: number;
    stock: number;
    details: Record<string, unknown>;
}
