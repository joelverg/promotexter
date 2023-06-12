import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationController } from './controllers/authorization/authorization.controller';
import { AuthorizationService } from './services/authorization/authorization.service';
import { LettersCombinationService } from './services/letters-combination/letters-combination.service';

@Module({
  imports: [],
  controllers: [AppController, AuthorizationController],
  providers: [AppService, AuthorizationService, LettersCombinationService],
})
export class AppModule {}
