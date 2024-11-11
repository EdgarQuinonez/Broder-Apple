import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Set Authorization header if token is present for any request
  if (token) {
    req.headers.set('Authorization', `Token ${token}`);
  }
    
  return next(req);
};
