import axios from 'axios';
import {
  fetchAllProducts,
  fetchProductById,
  fetchBeautyCategories,
  BEAUTY_CATEGORY_SLUGS,
} from '@/services/productService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProduct = {
  id: 1, title: 'Lipstick', description: 'A lipstick',
  price: 12.99, discountPercentage: 10, rating: 4.5,
  stock: 50, brand: 'Maybelline', category: 'beauty',
  thumbnail: 'url', images: ['url1'],
  availabilityStatus: 'In Stock', shippingInformation: '3 days',
  returnPolicy: '30 days', warrantyInformation: '1 year', reviews: [],
};

describe('productService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllProducts', () => {
    it('fetches products from all beauty category slugs and merges them', async () => {
      // return one product for the first slug, empty for the rest
      mockedAxios.get
        .mockResolvedValueOnce({ data: { products: [mockProduct] } })
        .mockResolvedValue({ data: { products: [] } });

      const result = await fetchAllProducts();

      expect(mockedAxios.get).toHaveBeenCalledTimes(BEAUTY_CATEGORY_SLUGS.length);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockProduct);
    });

    it('calls the correct URL for each category slug', async () => {
      mockedAxios.get.mockResolvedValue({ data: { products: [] } });

      await fetchAllProducts();

      BEAUTY_CATEGORY_SLUGS.forEach((slug) => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          `https://dummyjson.com/products/category/${slug}`
        );
      });
    });

    it('throws when axios fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
      await expect(fetchAllProducts()).rejects.toThrow('Network error');
    });
  });

  describe('fetchProductById', () => {
    it('returns the product data for the given id', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

      const result = await fetchProductById(1);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products/1'
      );
      expect(result).toEqual(mockProduct);
    });

    it('throws when axios fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Not found'));
      await expect(fetchProductById(999)).rejects.toThrow('Not found');
    });
  });

  describe('fetchBeautyCategories', () => {
    it('returns only beauty-related categories filtered from full list', async () => {
      const allCategories = [
        { slug: 'beauty', name: 'Beauty', url: '...' },
        { slug: 'fragrances', name: 'Fragrances', url: '...' },
        { slug: 'furniture', name: 'Furniture', url: '...' },
        { slug: 'groceries', name: 'Groceries', url: '...' },
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: allCategories });

      const result = await fetchBeautyCategories();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products/categories'
      );
      expect(result).toHaveLength(2);
      expect(result.map((c) => c.slug)).toEqual(['beauty', 'fragrances']);
    });

    it('returns empty array when no categories match', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: [{ slug: 'furniture', name: 'Furniture', url: '...' }],
      });

      const result = await fetchBeautyCategories();
      expect(result).toHaveLength(0);
    });

    it('throws when axios fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
      await expect(fetchBeautyCategories()).rejects.toThrow('Network error');
    });
  });
});