// Payment Success Email Template
// Sent when payment is successful

import { Section, Text, Heading, Hr, Row, Column } from '@react-email/components';
import * as React from 'react';
import EmailLayout from '../components/EmailLayout.js';
import EmailHeader from '../components/EmailHeader.js';
import EmailFooter from '../components/EmailFooter.js';

interface Participant {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    isLeader: boolean;
}

interface PaymentSuccessEmailProps {
    leaderName: string;
    eventTitle: string;
    teamName: string;
    participants: Participant[];
    paymentId?: string;
    amount: number;
    registrationId: string;
    eventDate?: string;
    eventVenue?: string;
    coordinatorName?: string;
    coordinatorEmail?: string;
}

export default function PaymentSuccessEmail({
    leaderName,
    eventTitle,
    teamName,
    participants,
    paymentId,
    amount,
    registrationId,
    eventDate,
    eventVenue,
    coordinatorName,
    coordinatorEmail,
}: PaymentSuccessEmailProps) {
    return (
        <EmailLayout previewText={`Registration confirmed for ${eventTitle}`}>
            <EmailHeader title="Registration Confirmed! ✓" />

            <Section style={contentStyle}>
                {/* Greeting */}
                <Text style={greetingStyle}>
                    Hello <strong>{leaderName}</strong>,
                </Text>

                <Text style={textStyle}>
                    Your registration for <strong style={{ color: '#00f0ff' }}>{eventTitle}</strong> has been confirmed!
                    We're excited to have you participate in AETHER Symposium 2026.
                </Text>

                {/* Success Badge */}
                <Section style={successBadgeStyle}>
                    <Text style={badgeTextStyle}>✓ PAYMENT SUCCESSFUL</Text>
                </Section>

                {/* Registration Details */}
                <Heading as="h3" style={sectionTitleStyle}>
                    Registration Details
                </Heading>

                <Section style={detailsBoxStyle}>
                    <Row>
                        <Column style={labelStyle}>Registration ID</Column>
                        <Column style={valueStyle}>{registrationId.slice(0, 8).toUpperCase()}</Column>
                    </Row>
                    <Hr style={rowDividerStyle} />
                    <Row>
                        <Column style={labelStyle}>Event</Column>
                        <Column style={valueStyle}>{eventTitle}</Column>
                    </Row>
                    <Hr style={rowDividerStyle} />
                    <Row>
                        <Column style={labelStyle}>Team Name</Column>
                        <Column style={valueStyle}>{teamName}</Column>
                    </Row>
                    <Hr style={rowDividerStyle} />
                    <Row>
                        <Column style={labelStyle}>Amount Paid</Column>
                        <Column style={valueHighlightStyle}>₹{amount}</Column>
                    </Row>
                    {paymentId && (
                        <>
                            <Hr style={rowDividerStyle} />
                            <Row>
                                <Column style={labelStyle}>Payment ID</Column>
                                <Column style={valueMonoStyle}>{paymentId}</Column>
                            </Row>
                        </>
                    )}
                </Section>

                {/* Team Members */}
                <Heading as="h3" style={sectionTitleStyle}>
                    Team Members ({participants.length})
                </Heading>

                <Section style={participantsBoxStyle}>
                    {participants.map((p, index) => (
                        <Section key={index} style={participantRowStyle}>
                            <Text style={participantNameStyle}>
                                {p.fullName}
                                {p.isLeader && <span style={leaderBadgeStyle}> (Leader)</span>}
                            </Text>
                            <Text style={participantDetailStyle}>
                                {p.email} • {p.college}
                            </Text>
                        </Section>
                    ))}
                </Section>

                {/* Event Info */}
                {(eventDate || eventVenue) && (
                    <>
                        <Heading as="h3" style={sectionTitleStyle}>
                            Event Information
                        </Heading>
                        <Section style={detailsBoxStyle}>
                            {eventDate && (
                                <Row>
                                    <Column style={labelStyle}>Date</Column>
                                    <Column style={valueStyle}>{eventDate}</Column>
                                </Row>
                            )}
                            {eventVenue && (
                                <>
                                    <Hr style={rowDividerStyle} />
                                    <Row>
                                        <Column style={labelStyle}>Venue</Column>
                                        <Column style={valueStyle}>{eventVenue}</Column>
                                    </Row>
                                </>
                            )}
                        </Section>
                    </>
                )}

                {/* Coordinator Info */}
                {coordinatorName && (
                    <Section style={coordinatorBoxStyle}>
                        <Text style={coordinatorTitleStyle}>Event Coordinator</Text>
                        <Text style={coordinatorNameStyle}>{coordinatorName}</Text>
                        {coordinatorEmail && (
                            <Text style={coordinatorEmailStyle}>{coordinatorEmail}</Text>
                        )}
                    </Section>
                )}

                {/* What's Next */}
                <Section style={nextStepsStyle}>
                    <Heading as="h3" style={sectionTitleStyle}>
                        What's Next?
                    </Heading>
                    <Text style={textStyle}>
                        • Save this email for your records{'\n'}
                        • Join our WhatsApp group for event updates{'\n'}
                        • Arrive at the venue 15 minutes early{'\n'}
                        • Bring valid college ID for verification
                    </Text>
                </Section>

                <Text style={signoffStyle}>
                    See you at the symposium! 🚀
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

const successBadgeStyle: React.CSSProperties = {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    margin: '0 0 32px',
};

const badgeTextStyle: React.CSSProperties = {
    color: '#22c55e',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '1px',
};

const sectionTitleStyle: React.CSSProperties = {
    color: '#00f0ff',
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

const labelStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '12px',
    width: '40%',
    padding: '8px 0',
};

const valueStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '14px',
    width: '60%',
    padding: '8px 0',
    textAlign: 'right',
};

const valueHighlightStyle: React.CSSProperties = {
    ...valueStyle,
    color: '#22c55e',
    fontWeight: 'bold',
};

const valueMonoStyle: React.CSSProperties = {
    ...valueStyle,
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#888',
};

const rowDividerStyle: React.CSSProperties = {
    borderColor: '#1a1a24',
    margin: 0,
};

const participantsBoxStyle: React.CSSProperties = {
    backgroundColor: '#0a0a0f',
    borderRadius: '8px',
    padding: '16px',
    margin: '0 0 24px',
};

const participantRowStyle: React.CSSProperties = {
    borderBottom: '1px solid #1a1a24',
    padding: '12px 0',
};

const participantNameStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '14px',
    margin: '0 0 4px',
};

const leaderBadgeStyle: React.CSSProperties = {
    color: '#a855f7',
    fontSize: '12px',
};

const participantDetailStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '12px',
    margin: 0,
};

const coordinatorBoxStyle: React.CSSProperties = {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    margin: '0 0 24px',
};

const coordinatorTitleStyle: React.CSSProperties = {
    color: '#a855f7',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: '0 0 8px',
};

const coordinatorNameStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 4px',
};

const coordinatorEmailStyle: React.CSSProperties = {
    color: '#888',
    fontSize: '12px',
    margin: 0,
};

const nextStepsStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    borderRadius: '8px',
    padding: '16px',
    margin: '0 0 24px',
};

const signoffStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: '16px',
    textAlign: 'center',
    margin: 0,
};
