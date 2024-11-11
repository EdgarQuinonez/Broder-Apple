// token.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  setToken(token: string) {
    if (token) {
      this.cookieService.set('authToken', token); // Save token in cookies
    }
  }

  getAuthToken(): string | null {
    return this.cookieService.get('authToken') || null; // Retrieve token from cookies
  }
}
