// authService.test.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2'

// Mock PrismaService
jest.mock('../../src/prisma/prisma.service');

// Mock JwtService
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  let authService: AuthService;
  let prismaServiceMock: jest.Mocked<PrismaService>;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        JwtService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaServiceMock = module.get<PrismaService>(PrismaService) as jest.Mocked<PrismaService>;
    jwtServiceMock = module.get<JwtService>(JwtService) as jest.Mocked<JwtService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a customer user', async () => {
      // Mock Prisma create method
      prismaServiceMock.user.create.mockResolvedValueOnce({
        id: 1,
        fullName: 'John Doe',
        phone: '123456789',
        role: 'customer',
        email: 'john@example.com',
      });

      const dto = {
        fullName: 'John Doe',
        phone: '123456789',
        role: 'customer',
        email: 'john@example.com',
        password: 'password123',
      };

      const result = await authService.signup(dto);

      expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
        data: {
          fullName: 'John Doe',
          phone: '123456789',
          role: 'customer',
          email: 'john@example.com',
          password: expect.any(String), // Ensure password is hashed
        },
        select: {
          fullName: true,
          phone: true,
          role: true,
          email: true,
        },
      });

      expect(result).toEqual({
        id: 1,
        fullName: 'John Doe',
        phone: '123456789',
        role: 'customer',
        email: 'john@example.com',
      });
    });

    it('should throw ForbiddenException when credentials are taken', async () => {
      // Mock Prisma create method to throw a known error
      prismaServiceMock.user.create.mockRejectedValueOnce({
        code: 'P2002', // Simulate a duplicate entry error
      });

      const dto = /* your test data */;

      await expect(authService.signup(dto)).rejects.toThrowError(ForbiddenException);
    });
    // Add more test cases as needed
  });

  describe('signin', () => {
    it('should sign in a customer user with correct credentials', async () => {
      // Mock Prisma findUnique method
      prismaServiceMock.user.findUnique.mockResolvedValueOnce({
        id: 1,
        fullName: 'John Doe',
        phone: '123456789',
        role: 'customer',
        email: 'john@example.com',
        password: await argon.hash('password123'), // Hashed password
      });

      const dto = {
        role: 'customer',
        email: 'john@example.com',
        password: 'password123',
      };

      // Mock argon.verify to always return true for simplicity in this example
      jest.spyOn(argon, 'verify').mockResolvedValueOnce(true);

      // Mock token generation
      jwtServiceMock.signAsync.mockResolvedValueOnce('mockedAccessToken');

      const result = await authService.signin(dto);

      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: 'john@example.com',
        },
      });

      expect(argon.verify).toHaveBeenCalledWith(
        await argon.hash('password123'), // Hash the provided password for comparison
        'password123',
      );

      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({
        sub: 1,
        fullName: 'John Doe',
        email: 'john@example.com',
        role: 'customer',
      }, {
        expiresIn: '120m',
        secret: 'brothers',
      });

      expect(result).toEqual({
        access_token: 'mockedAccessToken',
        role: 'customer',
      });
    });

    it('should throw ForbiddenException when credentials are not correct', async () => {
      // Mock Prisma findUnique method to return null (user not found)
      prismaServiceMock.user.findUnique.mockResolvedValueOnce(null);

      const dto = /* your test data */;

      await expect(authService.signin(dto)).rejects.toThrowError(ForbiddenException);
    });

    it('should throw ForbiddenException when password does not match', async () => {
      // Mock Prisma findUnique method
      prismaServiceMock.user.findUnique.mockResolvedValueOnce({
        id: 1,
        fullName: 'John Doe',
        phone: '123456789
