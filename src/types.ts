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
  images: string[];
}

export interface JSONresponse {
  products: productDatum[];
  total: number;
  skip: number;
  limit: number;
}

export type lsObject = {
  id: number;
  amount: number;
  price: number;
  discount: number;
  itemData: productDatum;
};

export type queryObj = [parameter?: string, values?: string[]];

export const selectOptions: object = {
  price_ASC: 'Sort by price ASC',
  price_DESC: 'Sort by price DESC',
  rating_ASC: 'Sort by rating ASC',
  rating_DESC: 'Sort by rating DESC',
  discount_ASC: 'Sort by discount ASC',
  discount_DESC: 'Sort by discount DESC',
};
