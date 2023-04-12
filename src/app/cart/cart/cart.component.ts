import {Component, OnInit} from '@angular/core';
import {CartItemsService} from '../../core/communication-service/cart-items.service';
import {CartItem} from '../../core/model/cartItem.model';
import {TaxService} from '../../core/business-service/tax.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartItemsService: CartItemsService,
              public taxService: TaxService) {
  }

  ngOnInit(): void {
    this.cartItems = this.cartItemsService.getCartItems();
  }

  removeFromCart(item: CartItem): void {
    this.cartItemsService.removeFromCart(item);
    this.cartItems = this.cartItemsService.getCartItems();
  }
}
