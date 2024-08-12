import { Component, effect, inject, input } from '@angular/core';
import { productDetailStateService } from '../../data-access/product-detail-state.service';
import { CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../shared/data-access/cart-state.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styles: ``,
  providers: [productDetailStateService],
})
export default class ProductDetailComponent {
  
  productDetailState = inject(productDetailStateService).state;
  cartState = inject(CartStateService).state;
  id = input.required<string>();
  constructor() { 
    effect(() => {
      console.log(this.id());
      this.productDetailState.getById(this.id());
    });
  }

  addToCart() {
    this.cartState.add({
      product: this.productDetailState.product()!,
      quantity: 1,
    });
  }
}
