import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
//delete it later
  if (token) {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    console.log('Token Expiry (exp):', tokenPayload.exp);
    console.log('Current Time (Unix):', Math.floor(Date.now() / 1000));

    if (tokenPayload.exp < Math.floor(Date.now() / 1000)) {
      console.log('Token is expired!');
    } else {
      console.log('Token is valid.');
    }
  }


  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
