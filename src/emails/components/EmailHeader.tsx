// Email Header Component - AETHER Branding
// Logo and title for all emails

import { Section, Heading, Text } from '@react-email/components';
import * as React from 'react';

interface EmailHeaderProps {
    title?: string;
}

export default function EmailHeader({ title }: EmailHeaderProps) {
    return (
        <Section style={headerStyle}>
            {/* AETHER Logo Text */}
            <Heading style={logoStyle}>
                AETHER
            </Heading>
            <Text style={subtitleStyle}>
                Data Science & AI/ML Club • IIIT Lucknow
            </Text>
            <Text style={symposiumBadgeStyle}>
                AETHER SYMPOSIUM 2026
            </Text>
            {title && (
                <Heading as="h2" style={titleStyle}>
                    {title}
                </Heading>
            )}
            {/* Gradient Line */}
            <div style={gradientLineStyle} />
        </Section>
    );
}

// Styles
const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '32px 24px 24px',
    background: 'linear-gradient(180deg, #0f0f18 0%, transparent 100%)',
};

const logoStyle: React.CSSProperties = {
    color: '#00f0ff',
    fontSize: '36px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '4px',
    textShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
};

const subtitleStyle: React.CSSProperties = {
    color: '#888',
    fontSize: '12px',
    margin: '4px 0 16px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
};

const symposiumBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #00f0ff 0%, #a855f7 100%)',
    color: '#000',
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '6px 16px',
    borderRadius: '20px',
    letterSpacing: '1px',
    margin: '0 0 24px',
};

const titleStyle: React.CSSProperties = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '24px 0 0',
};

const gradientLineStyle: React.CSSProperties = {
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #00f0ff, #a855f7, transparent)',
    margin: '24px 0 0',
};
