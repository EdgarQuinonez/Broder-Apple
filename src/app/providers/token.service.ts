// token.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  private tokenKey = 'authToken';

  setAuthToken(token: string) {
    if (token) {
      this.cookieService.set(this.tokenKey, token); // Save token in cookies
    }
  }

  getAuthToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null; // Retrieve token from cookies
  }
  
  clearAuthToken() {
    this.cookieService.delete(this.tokenKey); // Remove token from cookies
  }
}
