import { Injectable} from "@angular/core";
import { HttpClient, HttpParams} from "@angular/common/http";

import { Restaurant } from './restaurant/restaurant.model'
import { Review } from '../restaurant-detail/reviews/review/review.model';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';
import { MEAT_API} from '../app.api';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorHandler } from '../app.error-handler';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient){
  }

  restaurants(search?:string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;
    if(search){
      params = new HttpParams().set("q",search);
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`,{params:params});
  }

  restaurantById(id: String): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
  }

  reviewsOfRestaurant(id: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${MEAT_API}/restaurants/${id}/reviews`);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
  }
}
