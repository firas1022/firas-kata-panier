import {Component, OnInit} from '@angular/core';
import {Product} from "./core/model/product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'firas-kata-panier';
  product: Product | undefined;
  ngOnInit(): void {
    this.product = {
      "id": 1,
      "productName": "Zammara",
      "price": 1.76,
      "quantity": 7,
      "isImported": true,
      "category": "Food"
    }
  }
}

