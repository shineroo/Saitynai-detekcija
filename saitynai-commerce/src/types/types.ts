export interface Product {
    id: number;
    image: string;
    name: string;
    description: string;
    category_id: number
}

export interface Category {
    id: number;
    name: string;
}

export interface Userdata {
    name: string;
    image: string;
}