import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../core/api-service/api.service";
import {Product} from "../../core/model/product.model";
import {CartItemsService} from "../../core/communication-service/cart-items.service";
import {CartItem} from "../../core/model/cartItem.model";
import {filter} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];
  categories: (string | undefined)[] = [];
  selectedCategory = '';
  filteredList: Product[] = [];
  cartItems: CartItem[] = [];

  constructor(private apiService: ApiService,
              private cartItemsService: CartItemsService) {
  }

  ngOnInit(): void {
    this.apiService.getProductList().subscribe(products => {
      // Extract unique categories from the product list
      this.categories = Array.from(new Set(products.map(item => item.category)));
      // Initialize productList with all products
      this.productList = products.filter(product => product.productName !== '');
      // Initialize filteredList with all products
      this.filteredList = this.productList;
    });
    // Initialise Cart Items from CartItemsService
    this.cartItems = this.cartItemsService.getCartItems();
    // subscribe to cart Items subject in order to get updated to selected product actions
    this.cartItemsService.getValue().subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  onChangeCategoryFilter() {
    // Filter products based on selected category
    this.filteredList = this.productList.filter(product => product.category === this.selectedCategory || this.selectedCategory === '');
  }
}
