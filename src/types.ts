export interface productDatum {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  imgaes: string[];
}

export interface JSONresponse {
  products: productDatum[];
  total: number;
  skip: number;
  limit: number;
}
