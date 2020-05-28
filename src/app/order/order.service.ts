import { Injectable } from '@angular/core';

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { MEAT_API} from '../app.api';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {
  constructor(private cartService: ShoppingCartService, private http: HttpClient){};

  cartItems(): CartItem[]{
    return this.cartService.items;
  }

  increasyQty(item: CartItem){
    this.cartService.increasyQty(item);
  }

  decreasyQty(item: CartItem){
    this.cartService.decreasyQty(item);
  }

  remove(item: CartItem){
    this.cartService.removeItem(item);
  }

  itemsValue():number{
    return this.cartService.total();
  }

  clear(){
    this.cartService.clear();
  }

  checkOrder(order: Order): Observable<string>{
    return this.http.post<Order>(`${MEAT_API}/orders`, order)
                    .map(order => order.id);
  }
}
