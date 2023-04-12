import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CartItem} from "../model/cartItem.model";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private cartItemsSubject = new Subject<CartItem[]>();
  cartItems: CartItem[] = []

  constructor() {
    this.cartItemsSubject.next([]);
  }

  // Method to emit values to the subject
  emitValue(value: CartItem[]) {
    this.cartItems = value;
    this.cartItemsSubject.next(value);
  }

  // Method to subscribe to the subject as an observable
  getValue(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(item: CartItem): void {
    const index = this.cartItems.findIndex(i => i.product.id === item.product.id);
    if (index !== -1) {
      this.cartItems[index].quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(item: CartItem): void {
    this.cartItems = this.cartItems.filter(i => i !== item);
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }
}
