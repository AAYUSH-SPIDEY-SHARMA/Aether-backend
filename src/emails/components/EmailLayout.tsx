// Email Layout Component - AETHER Branded Dark Theme
// Base layout for all email templates

import {
    Html,
    Head,
    Body,
    Container,
    Font,
} from '@react-email/components';
import * as React from 'react';

interface EmailLayoutProps {
    children: React.ReactNode;
    previewText?: string;
}

export default function EmailLayout({ children, previewText }: EmailLayoutProps) {
    return (
        <Html>
            <Head>
                <Font
                    fontFamily="Arial"
                    fallbackFontFamily="sans-serif"
                />
                {previewText && (
                    <meta name="x-apple-disable-message-reformatting" />
                )}
            </Head>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    {children}
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const bodyStyle: React.CSSProperties = {
    backgroundColor: '#0a0a0f',
    margin: 0,
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
};

const containerStyle: React.CSSProperties = {
    backgroundColor: '#111118',
    borderRadius: '16px',
    border: '1px solid #1a1a24',
    maxWidth: '600px',
    margin: '0 auto',
    overflow: 'hidden',
};
