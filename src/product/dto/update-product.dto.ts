import { ProductCharacteristics } from '../product.model';

export class UpdateProductDto {
  image?: string;

  title?: string;

  price?: number;

  oldPrice?: number;

  credit?: number;

  calculatedRating?: number;

  description?: string;

  advantages?: string;

  disAdvantages?: string;

  categories?: string[];

  tags?: string;

  characteristics?: ProductCharacteristics[];
}
