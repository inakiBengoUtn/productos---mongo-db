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
