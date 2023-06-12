import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Token } from 'src/models/token';
import * as crypto from 'crypto';

@Injectable()
export class AuthorizationService {
  tokenStorage: Token = {
    token: '',
  };
  validationAttempts = 0;
  isUserBlocked = false;
  getAuthorizationToken(): Observable<Token> {
    const tokenLength = 32; // Length of the token in bytes
    const randomBytes = crypto.randomBytes(tokenLength);
    const token: Token = {
      token: randomBytes.toString('hex'),
    };

    this.tokenStorage = token;

    return of(token);
  }

  verifyAuthorizationToken(token: Token): Observable<string> {
    console.log(
      this.validationAttempts < 5 && this.isUserBlocked === false,
      'validation',
    );
    console.log(this.isUserBlocked, 'after');

    if (this.validationAttempts < 5 && this.isUserBlocked === false) {
      if (token.token === this.tokenStorage.token) {
        return of('Success');
      } else {
        this.validationAttempts++;

        console.log(this.validationAttempts);

        return of('Invalid Token');
      }
    } else {
      return this.userBlocked();
    }
  }

  userBlocked(): Observable<string> {
    console.log(this.isUserBlocked);

    if (this.isUserBlocked === true) {
      console.log(this.isUserBlocked);

      return of('User is still block');
    } else {
      this.isUserBlocked = true;
      this.validationAttempts = 0;
      setTimeout(() => {
        this.isUserBlocked = false;
      }, 180000);
      return of('User Blocked');
    }
  }
}
