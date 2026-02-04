// Email Footer Component - AETHER
// IIIT Lucknow branding and contact info

import { Section, Text, Link, Hr } from '@react-email/components';
import * as React from 'react';

export default function EmailFooter() {
    return (
        <Section style={footerStyle}>
            <Hr style={dividerStyle} />

            {/* Contact Info */}
            <Text style={contactStyle}>
                Questions? Contact us at{' '}
                <Link href="mailto:aether@iiitl.ac.in" style={linkStyle}>
                    aether@iiitl.ac.in
                </Link>
            </Text>

            {/* Social Links */}
            <Text style={socialStyle}>
                <Link href="https://instagram.com/aether.iiitl" style={socialLinkStyle}>
                    Instagram
                </Link>
                {' • '}
                <Link href="https://linkedin.com/company/aether-iiitl" style={socialLinkStyle}>
                    LinkedIn
                </Link>
                {' • '}
                <Link href="https://aether-iiitl.in" style={socialLinkStyle}>
                    Website
                </Link>
            </Text>

            {/* Institution */}
            <Text style={institutionStyle}>
                AETHER - AI & Data Science Club
            </Text>
            <Text style={addressStyle}>
                Indian Institute of Information Technology, Lucknow
            </Text>

            {/* Legal */}
            <Text style={legalStyle}>
                © 2026 AETHER Symposium. All rights reserved.
            </Text>
            <Text style={legalStyle}>
                This is an automated message. Please do not reply directly.
            </Text>
        </Section>
    );
}

// Styles
const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '24px',
    backgroundColor: '#0a0a0f',
};

const dividerStyle: React.CSSProperties = {
    borderColor: '#1a1a24',
    margin: '0 0 24px',
};

const contactStyle: React.CSSProperties = {
    color: '#888',
    fontSize: '13px',
    margin: '0 0 16px',
};

const linkStyle: React.CSSProperties = {
    color: '#00f0ff',
    textDecoration: 'none',
};

const socialStyle: React.CSSProperties = {
    margin: '0 0 24px',
};

const socialLinkStyle: React.CSSProperties = {
    color: '#a855f7',
    fontSize: '12px',
    textDecoration: 'none',
};

const institutionStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '12px',
    margin: '0 0 4px',
    fontWeight: 'bold',
};

const addressStyle: React.CSSProperties = {
    color: '#555',
    fontSize: '11px',
    margin: '0 0 16px',
};

const legalStyle: React.CSSProperties = {
    color: '#444',
    fontSize: '10px',
    margin: '0 0 4px',
};
