import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {CartItem} from '../model/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor() {
  }

  /**
   * Calculate Price with tax applied
   * @param product Product
   */
  getPriceWithTax(product: Product): string {
    let taxRate = this.getTaxRate(product);
    if (product.isImported) {
      taxRate += 5;
    }
    let priceWithTax = product.price ? product.price * (1 + taxRate / 100) : 0;
    let taxAmount = Math.ceil(priceWithTax * 20) / 20 - priceWithTax;
    priceWithTax += taxAmount;
    return priceWithTax.toFixed(2);
  }

  /**
   * Calculate tax rate taking into consideration the product category
   * @param product Product
   */
  getTaxRate(product: Product): number {
    if (product.category === 'Nourriture' || (product.category === 'Médicaments' && product.isImported === false)) {
      return 0;
    } else if (product.category === 'Livres') {
      return 10;
    } else {
      return 20;
    }
  }

  /**
   * Evaluate the tax from a CartItem as input
   * @param cartItem: CartItem
   */
  getTax(cartItem: CartItem): number {
    // @ts-ignore
    return (cartItem.priceWithTax - cartItem.product.price).toFixed(2);
  }

  /**
   * calculate total taxes for a list of cart items
   * @param cartItems
   */
  getTotalTax(cartItems: CartItem[]) {
    let total = 0;
    cartItems.forEach(cartItem => {
      total += Number(this.getTax(cartItem));
    });
    return total;
  }

  /**
   * calculate total taxes for a list of cart items
   * @param cartItems
   */
  getTotalTTC(cartItems: CartItem[]) {
    let total = 0;
    cartItems.forEach(cartItem => {
      total += cartItem.priceWithTax;
    });
    return total;
  }
}
