// Payment Failed Email Template
// Sent when payment fails

import { Section, Text, Heading, Link } from '@react-email/components';
import * as React from 'react';
import EmailLayout from '../components/EmailLayout.js';
import EmailHeader from '../components/EmailHeader.js';
import EmailFooter from '../components/EmailFooter.js';

interface PaymentFailedEmailProps {
    leaderName: string;
    eventTitle: string;
    teamName: string;
    amount: number;
    registrationId: string;
    retryUrl?: string;
}

export default function PaymentFailedEmail({
    leaderName,
    eventTitle,
    teamName,
    amount,
    registrationId,
    retryUrl,
}: PaymentFailedEmailProps) {
    return (
        <EmailLayout previewText={`Payment failed for ${eventTitle} registration`}>
            <EmailHeader title="Payment Failed" />

            <Section style={contentStyle}>
                {/* Greeting */}
                <Text style={greetingStyle}>
                    Hello <strong>{leaderName}</strong>,
                </Text>

                <Text style={textStyle}>
                    Unfortunately, your payment for <strong style={{ color: '#00f0ff' }}>{eventTitle}</strong> could not be processed.
                    Don't worry — this can happen due to various reasons.
                </Text>

                {/* Failed Badge */}
                <Section style={failedBadgeStyle}>
                    <Text style={badgeTextStyle}>✗ PAYMENT FAILED</Text>
                </Section>

                {/* Registration Details */}
                <Section style={detailsBoxStyle}>
                    <Text style={detailLabelStyle}>Registration ID</Text>
                    <Text style={detailValueStyle}>{registrationId.slice(0, 8).toUpperCase()}</Text>

                    <Text style={detailLabelStyle}>Event</Text>
                    <Text style={detailValueStyle}>{eventTitle}</Text>

                    <Text style={detailLabelStyle}>Team Name</Text>
                    <Text style={detailValueStyle}>{teamName}</Text>

                    <Text style={detailLabelStyle}>Amount</Text>
                    <Text style={detailValueStyle}>₹{amount}</Text>
                </Section>

                {/* Common Reasons */}
                <Heading as="h3" style={sectionTitleStyle}>
                    Common Reasons for Failure
                </Heading>

                <Section style={reasonsBoxStyle}>
                    <Text style={reasonStyle}>• Insufficient balance in your account</Text>
                    <Text style={reasonStyle}>• Bank declined the transaction</Text>
                    <Text style={reasonStyle}>• Network issues during payment</Text>
                    <Text style={reasonStyle}>• Incorrect OTP or authentication failure</Text>
                    <Text style={reasonStyle}>• Card/UPI limits exceeded</Text>
                </Section>

                {/* What to do */}
                <Heading as="h3" style={sectionTitleStyle}>
                    What You Can Do
                </Heading>

                <Text style={textStyle}>
                    1. <strong>Try Again</strong> — Visit our registration page and complete the payment{'\n'}
                    2. <strong>Use Different Payment Method</strong> — Try UPI, card, or net banking{'\n'}
                    3. <strong>Contact Support</strong> — If issue persists, reach out to us
                </Text>

                {/* Retry Button */}
                {retryUrl && (
                    <Section style={buttonContainerStyle}>
                        <Link href={retryUrl} style={buttonStyle}>
                            Retry Registration →
                        </Link>
                    </Section>
                )}

                {/* Support */}
                <Section style={supportBoxStyle}>
                    <Text style={supportTitleStyle}>Need Help?</Text>
                    <Text style={supportTextStyle}>
                        Contact us at{' '}
                        <Link href="mailto:aether@iiitl.ac.in" style={linkStyle}>
                            aether@iiitl.ac.in
                        </Link>
                    </Text>
                    <Text style={supportTextStyle}>
                        Include your Registration ID for faster support.
                    </Text>
                </Section>

                <Text style={noteStyle}>
                    Note: If money was deducted from your account, it will be automatically refunded within 5-7 business days.
                </Text>
            </Section>

            <EmailFooter />
        </EmailLayout>
    );
}

// Styles
const contentStyle: React.CSSProperties = {
    padding: '32px 24px',
};

const greetingStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '18px',
    margin: '0 0 16px',
};

const textStyle: React.CSSProperties = {
    color: '#aaa',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0 0 24px',
};

const failedBadgeStyle: React.CSSProperties = {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    margin: '0 0 32px',
};

const badgeTextStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '1px',
};

const detailsBoxStyle: React.CSSProperties = {
    backgroundColor: '#0a0a0f',
    borderRadius: '8px',
    padding: '16px',
    margin: '0 0 24px',
};

const detailLabelStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: '0 0 4px',
};

const detailValueStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '14px',
    margin: '0 0 12px',
};

const sectionTitleStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: '0 0 16px',
};

const reasonsBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: '8px',
    padding: '16px',
    margin: '0 0 24px',
};

const reasonStyle: React.CSSProperties = {
    color: '#aaa',
    fontSize: '13px',
    margin: '0 0 8px',
};

const buttonContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    margin: '0 0 24px',
};

const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: '#00f0ff',
    color: '#000',
    padding: '14px 32px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'none',
};

const supportBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    margin: '0 0 24px',
};

const supportTitleStyle: React.CSSProperties = {
    color: '#a855f7',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '0 0 8px',
};

const supportTextStyle: React.CSSProperties = {
    color: '#888',
    fontSize: '13px',
    margin: '0 0 4px',
};

const linkStyle: React.CSSProperties = {
    color: '#00f0ff',
    textDecoration: 'none',
};

const noteStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '12px',
    fontStyle: 'italic',
    textAlign: 'center',
    margin: 0,
};
