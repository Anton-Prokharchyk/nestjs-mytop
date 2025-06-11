import { Product } from './product.model';

describe('Product', () => {
  it('should be defined', () => {
    expect(new Product()).toBeDefined();
  });
});
