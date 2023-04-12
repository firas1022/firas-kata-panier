import {Product} from './product.model';

export class CartItem {
  product: Product = {} as Product; // initialisé avec une valeur par défaut
  quantity = 0;
  priceWithTax = 0;

  constructor() {
  }
}
