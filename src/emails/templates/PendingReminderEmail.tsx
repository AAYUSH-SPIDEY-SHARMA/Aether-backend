// Pending Reminder Email Template
// Sent when payment is still pending after 30 minutes

import { Section, Text, Heading, Link } from '@react-email/components';
import * as React from 'react';
import EmailLayout from '../components/EmailLayout.js';
import EmailHeader from '../components/EmailHeader.js';
import EmailFooter from '../components/EmailFooter.js';

interface PendingReminderEmailProps {
    leaderName: string;
    eventTitle: string;
    teamName: string;
    amount: number;
    registrationId: string;
    registrationUrl?: string;
}

export default function PendingReminderEmail({
    leaderName,
    eventTitle,
    teamName,
    amount,
    registrationId,
    registrationUrl,
}: PendingReminderEmailProps) {
    return (
        <EmailLayout previewText={`Complete your registration for ${eventTitle}`}>
            <EmailHeader title="Complete Your Registration" />

            <Section style={contentStyle}>
                {/* Greeting */}
                <Text style={greetingStyle}>
                    Hello <strong>{leaderName}</strong>,
                </Text>

                <Text style={textStyle}>
                    We noticed that your registration for{' '}
                    <strong style={{ color: '#00f0ff' }}>{eventTitle}</strong>{' '}
                    is still pending. Your spot is reserved, but payment is required to confirm your participation.
                </Text>

                {/* Pending Badge */}
                <Section style={pendingBadgeStyle}>
                    <Text style={badgeTextStyle}>⏳ PAYMENT PENDING</Text>
                </Section>

                {/* Registration Summary */}
                <Heading as="h3" style={sectionTitleStyle}>
                    Registration Summary
                </Heading>

                <Section style={detailsBoxStyle}>
                    <Text style={detailLabelStyle}>Registration ID</Text>
                    <Text style={detailValueStyle}>{registrationId.slice(0, 8).toUpperCase()}</Text>

                    <Text style={detailLabelStyle}>Event</Text>
                    <Text style={detailValueStyle}>{eventTitle}</Text>

                    <Text style={detailLabelStyle}>Team Name</Text>
                    <Text style={detailValueStyle}>{teamName}</Text>

                    <Text style={detailLabelStyle}>Amount Due</Text>
                    <Text style={amountStyle}>₹{amount}</Text>
                </Section>

                {/* Urgency Message */}
                <Section style={urgencyBoxStyle}>
                    <Text style={urgencyIconStyle}>⚡</Text>
                    <Text style={urgencyTitleStyle}>Don't Miss Out!</Text>
                    <Text style={urgencyTextStyle}>
                        Seats are filling up fast. Complete your payment now to secure your spot at AETHER Symposium 2026.
                    </Text>
                </Section>

                {/* Complete Payment Button */}
                {registrationUrl && (
                    <Section style={buttonContainerStyle}>
                        <Link href={registrationUrl} style={buttonStyle}>
                            Complete Payment Now →
                        </Link>
                    </Section>
                )}

                {/* What happens */}
                <Section style={infoBoxStyle}>
                    <Heading as="h4" style={infoTitleStyle}>
                        What happens if I don't pay?
                    </Heading>
                    <Text style={infoTextStyle}>
                        Your registration will expire and your spot may be given to another participant.
                        If you no longer wish to participate, you can ignore this email.
                    </Text>
                </Section>

                {/* Support */}
                <Text style={supportStyle}>
                    Having trouble? Contact us at{' '}
                    <Link href="mailto:aether@iiitl.ac.in" style={linkStyle}>
                        aether@iiitl.ac.in
                    </Link>
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

const pendingBadgeStyle: React.CSSProperties = {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    margin: '0 0 32px',
};

const badgeTextStyle: React.CSSProperties = {
    color: '#fbbf24',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '1px',
};

const sectionTitleStyle: React.CSSProperties = {
    color: '#fbbf24',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: '0 0 16px',
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

const amountStyle: React.CSSProperties = {
    color: '#fbbf24',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
};

const urgencyBoxStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(0, 240, 255, 0.1))',
    borderRadius: '8px',
    padding: '24px',
    textAlign: 'center',
    margin: '0 0 24px',
};

const urgencyIconStyle: React.CSSProperties = {
    fontSize: '32px',
    margin: '0 0 8px',
};

const urgencyTitleStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 8px',
};

const urgencyTextStyle: React.CSSProperties = {
    color: '#aaa',
    fontSize: '14px',
    margin: 0,
};

const buttonContainerStyle: React.CSSProperties = {
    textAlign: 'center',
    margin: '0 0 32px',
};

const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
    color: '#000',
    padding: '16px 40px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'none',
};

const infoBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
    borderRadius: '8px',
    padding: '16px',
    margin: '0 0 24px',
};

const infoTitleStyle: React.CSSProperties = {
    color: '#888',
    fontSize: '13px',
    fontWeight: 'bold',
    margin: '0 0 8px',
};

const infoTextStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '12px',
    margin: 0,
    lineHeight: '1.5',
};

const supportStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '13px',
    textAlign: 'center',
    margin: 0,
};

const linkStyle: React.CSSProperties = {
    color: '#00f0ff',
    textDecoration: 'none',
};
