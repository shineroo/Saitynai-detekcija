export interface Product {
    id: number;
    image: string;
    name: string;
    description: string;
    fk_category: number;
    price: number;
}

export interface Category {
    id: number;
    name: string;
}

export interface Userdata {
    given_name: string;
    family_name: string;
    picture: string;
    id: number;
    email: string;
    role: string;
    password: string
}

export interface Review {
    id: number;
    author: string;
    text: string;
    rating: number;
}