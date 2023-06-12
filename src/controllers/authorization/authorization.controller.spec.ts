import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Token } from '../../models/token';
import { of, lastValueFrom } from 'rxjs';

describe('AuthorizationController', () => {
  let controller: AuthorizationController;
  let authorizationService: AuthorizationService;

  const mockAuthorizationService = {
    getAuthorizationToken: jest.fn(),
    verifyAuthorizationToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizationController],
      providers: [
        {
          provide: AuthorizationService,
          useValue: mockAuthorizationService,
        },
      ],
    }).compile();

    controller = module.get<AuthorizationController>(AuthorizationController);
    authorizationService =
      module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get token', async () => {
    //Arrange
    const expectedToken: Token = {
      token: 'sampleToken',
    };

    //Act
    (<jest.Mock>authorizationService.getAuthorizationToken).mockImplementation(
      () => of(expectedToken),
    );
    const result = await lastValueFrom(controller.getAuthorizationToken());

    //Assert
    expect(authorizationService.getAuthorizationToken).toBeCalled();
    expect(result).toEqual(expectedToken);
  });

  it('should verify token', async () => {
    //Arrange
    const expectedOutput = 'Success';
    const token: Token = {
      token: 'sampleToken',
    };

    //Act
    (<jest.Mock>(
      authorizationService.verifyAuthorizationToken
    )).mockImplementation(() => of('Success'));
    const result = await lastValueFrom(
      controller.verifyAuthorizationToken(token),
    );

    //Assert
    expect(authorizationService.verifyAuthorizationToken).toBeCalled();
    expect(result).toEqual(expectedOutput);
  });
});
