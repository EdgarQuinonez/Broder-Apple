import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(TokenService).getAuthToken();
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Token ${authToken}`)
  });
  return next(newReq);	
};
