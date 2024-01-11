import { Test, TestingModule } from '@nestjs/testing';
// import { ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IsTechnicianGuard, IsCustomerGuard } from './auth.guards';
import { ExecutionContext } from '@nestjs/common';

describe('IsTechnicianGuard', () => {
  let guard: IsTechnicianGuard;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsTechnicianGuard,
        {
          provide: AuthService,
          useValue: {
            validateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<IsTechnicianGuard>(IsTechnicianGuard);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true for a valid technician token', () => {
    const mockRequest = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImZ1bGxOYW1lIjoiQmV0c2VnYXcgTWVzZWxlIiwiZW1haWwiOiJiZXRzZWVlZ2F3QGdtYWlsLmNvbWZzcyIsInJvbGUiOiJ0ZWNobmljaWFuIiwiaWF0IjoxNzA0OTc1MjMxLCJleHAiOjE3MDQ5ODI0MzF9.mF1NbUB_n8pwIwHtArqxOyoAgoWYQ5znN3pxgfCXew4',
      },
    };
    const mockContext: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: jest.fn(() => mockRequest) as () => any,
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
    } as unknown as ExecutionContext;

    jest
      .spyOn(authService, 'validateToken')
      .mockReturnValue({ role: 'technician' });

    const result = guard.canActivate(mockContext);

    expect(result).toBe(true);
  });

  it('should return false for an invalid technician token', () => {
    const mockRequest = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImZ1bGxOYW1lIjoiQmV0c2VnYXcgTWVzZWxlIiwiZW1haWwiOiJiZXRzZWVlZ2F3QGdtYWlsLmNvbWZmIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA0OTc1MzAwLCJleHAiOjE3MDQ5ODI1MDB9.DpgaPKlj-DTio1kuXVku5RhvKDiWD9zqTUyx9gcrgXU',
      },
    };
    const mockContext: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: jest.fn(() => mockRequest) as () => any,
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
    } as unknown as ExecutionContext;

    jest
      .spyOn(authService, 'validateToken')
      .mockReturnValue({ role: 'customer' });

    const result = guard.canActivate(mockContext);

    expect(result).toBe(false);
  });
});

describe('IsCustomerGuard', () => {
  let guard: IsCustomerGuard;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsCustomerGuard,
        {
          provide: AuthService,
          useValue: {
            validateToken: jest.fn(), // Mock the validateToken method
          },
        },
      ],
    }).compile();

    guard = module.get<IsCustomerGuard>(IsCustomerGuard);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true for a valid customer token', () => {
    const mockRequest = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImZ1bGxOYW1lIjoiQmV0c2VnYXcgTWVzZWxlIiwiZW1haWwiOiJiZXRzZWVlZ2F3QGdtYWlsLmNvbWZmIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA0OTc1MzAwLCJleHAiOjE3MDQ5ODI1MDB9.DpgaPKlj-DTio1kuXVku5RhvKDiWD9zqTUyx9gcrgXU',
      },
    };
    const mockContext: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: jest.fn(() => mockRequest) as () => any,
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
    } as unknown as ExecutionContext;

    jest
      .spyOn(authService, 'validateToken')
      .mockReturnValue({ role: 'technician' });

    const result = guard.canActivate(mockContext);

    expect(result).toBe(true);
  });

  it('should return false for an invalid customer token', () => {
    const mockRequest = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImZ1bGxOYW1lIjoiQmV0c2VnYXcgTWVzZWxlIiwiZW1haWwiOiJiZXRzZWVlZ2F3QGdtYWlsLmNvbWZzcyIsInJvbGUiOiJ0ZWNobmljaWFuIiwiaWF0IjoxNzA0OTc1MjMxLCJleHAiOjE3MDQ5ODI0MzF9.mF1NbUB_n8pwIwHtArqxOyoAgoWYQ5znN3pxgfCXew4',
      },
    };
    const mockContext: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: jest.fn(() => mockRequest) as () => any,
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
    } as unknown as ExecutionContext;

    jest
      .spyOn(authService, 'validateToken')
      .mockReturnValue({ role: 'technician' });

    const result = guard.canActivate(mockContext);

    expect(result).toBe(false);
  });
});
