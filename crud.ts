import { createServer, combineRoutes, httpListener, r, HttpError, HttpStatus } from '@marblejs/http';
import { logger$ } from '@marblejs/middleware-logger';
import { bodyParser$ } from '@marblejs/middleware-body';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { catchError, mergeMapTo, mergeMap, mapTo, map } from 'rxjs/operators';
import { of, throwError, from, Observable, OperatorFunction } from 'rxjs';
import { IO } from 'fp-ts/lib/IO';
import { pipe } from 'fp-ts/lib/function';
import User from './userDetails'
import { array, string } from 'fp-ts';
import postUserValidation from './validations/user/validationUser'
import getUserValidation from './validations/user/getUser';

/*------------------------
  👇 utility functions
-------------------------*/

// Alias 

type userObj = { id: string, name: string, age: number, city: string, country: string }


// getUser Function to get the data from './userDetails.ts'











/*------------------------
  👇 ROOT API definition
-------------------------*/

const root$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ => req$.pipe(
    mapTo({ body: `API version: v1` }),
  )),
);

const api$ = combineRoutes('/api/v1', [
  root$
]);


/*------------------------
  👇 SERVER definition
-------------------------*/

const middlewares = [
  // logger$(),
  bodyParser$(),
];

const effects = [
  api$,
];




