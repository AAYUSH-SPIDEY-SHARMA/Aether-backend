// Auth Service
// Business logic for authentication

import bcrypt from 'bcryptjs';
import { prisma } from '../../config/prisma.js';
import { generateTokenPair, verifyRefreshToken, TokenPair } from '../../utils/jwt.js';
import { AppError } from '../../middlewares/error.middleware.js';
import type { RegisterInput, LoginInput } from './auth.validation.js';

export interface AuthResult {
    user: {
        id: string;
        email: string;
        name: string | null;
        role: string;
    };
    tokens: TokenPair;
}

// Register new user
export async function registerUser(input: RegisterInput): Promise<AuthResult> {
    const { email, password, name } = input;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new AppError('Email already registered', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
        },
    });

    // Generate tokens
    const tokens = generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    // Store refresh token
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
    });

    return { user, tokens };
}

// Login user
export async function loginUser(input: LoginInput): Promise<AuthResult> {
    const { email, password } = input;

    // Find user
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    // Generate tokens
    const tokens = generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    // Store refresh token
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
    });

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        tokens,
    };
}

// Refresh tokens
export async function refreshTokens(refreshToken: string): Promise<TokenPair> {
    // Verify refresh token
    let payload;
    try {
        payload = verifyRefreshToken(refreshToken);
    } catch {
        throw new AppError('Invalid refresh token', 401);
    }

    // Find user and verify stored refresh token
    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
        throw new AppError('Invalid refresh token', 401);
    }

    // Generate new tokens
    const tokens = generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    // Update stored refresh token
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
}

// Logout user
export async function logoutUser(userId: string): Promise<void> {
    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
    });
}

// Get current user
export async function getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return user;
}
