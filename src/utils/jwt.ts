// JWT Utility Functions
// Handles token generation and verification

import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

// Generate access token (short-lived)
export function generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    } as SignOptions);
}

// Generate refresh token (long-lived)
export function generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    } as SignOptions);
}

// Generate both tokens
export function generateTokenPair(payload: TokenPayload): TokenPair {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
    };
}

// Verify access token
export function verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
}

// Verify refresh token
export function verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
}

// Extract token from Authorization header
export function extractBearerToken(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
}
