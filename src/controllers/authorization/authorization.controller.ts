import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Token } from 'src/models/token';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { LettersCombination } from 'src/models/letters-combination';
import { LettersCombinationService } from 'src/services/letters-combination/letters-combination.service';

@Controller('authorization')
export class AuthorizationController {
  constructor(
    private authorizationService: AuthorizationService,
    private lettersCombinationService: LettersCombinationService,
  ) {}

  @Get('/getToken')
  getAuthorizationToken(): Observable<Token> {
    return this.authorizationService.getAuthorizationToken();
  }

  @Post('/verifyToken')
  verifyAuthorizationToken(@Body() token: Token): Observable<string> {
    return this.authorizationService.verifyAuthorizationToken(token);
  }

  @Get('/getLettersCombination/:number')
  getLettersCombination(@Param('number') number: string): Observable<string[]> {
    return this.lettersCombinationService.getLettersCombination(number);
  }
}
