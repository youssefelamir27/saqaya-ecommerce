export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
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
  availabilityStatus: string;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  reviews: Review[];
}
export interface ProductsState {
  productList: Product[];
  selectedProduct: Product | null;
  flashSaleProducts: Product[];
  exploreProducts: Product[];
  browseCategories: { name: string; icon: string }[];
  activeCategory: string;
  loading: boolean;
  error: string | null;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  quantity: number;
}

export interface CartState {
  sideCartItems: CartItem[];
  isSideCartOpen: boolean;
}
