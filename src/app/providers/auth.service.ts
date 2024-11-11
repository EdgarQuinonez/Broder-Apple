// auth.service.ts
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authEndpoint = `${environment.api_base_url}/auth`;

  constructor(private tokenService: TokenService, private http: HttpClient) { }

  isLoggedIn(): boolean {
    const token = this.tokenService.getAuthToken(); 
    return !!token;
  }

  register(username: string, password: string) {
    const apiEndpoint = `${this.authEndpoint}/register`;
    return this.http.post<{ token: string }>(apiEndpoint, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          this.tokenService.setAuthToken(response.token); // Save token in cookies
        }
      })
    );
  }

  login(username: string, password: string) {
    const apiEndpoint = `${this.authEndpoint}/login`;
    return this.http.post<{ token: string }>(apiEndpoint, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          this.tokenService.setAuthToken(response.token); // Save token in cookies
        }
      })
    );
  }

  logout() {
    this.tokenService.clearAuthToken();
  }
}
