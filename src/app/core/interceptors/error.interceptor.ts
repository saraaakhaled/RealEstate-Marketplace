import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        console.error('Unauthorized: Please login again.');
      }

      else if (error.status === 403) {
        console.error('Forbidden: You do not have permission.');
      }

      else if (error.status === 404) {
        console.error('Resource not found.');
      }

      else if (error.status >= 500) {
        console.error('Server error. Please try again later.');
      }

      else {
        console.error('HTTP Error:', error);
      }

      return throwError(() => error);
    })

  );
};