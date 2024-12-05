export interface Product {
    id: number;
    name: string;
    count: number;
    imageUrl: string;
    size: {
      width: number;
      height: number;
    };
    weight: string;
    comments: Comment[];
  }
  
  export interface Comment {
    id: number;
    productId: number;
    description: string;
    date: string;
  }
  