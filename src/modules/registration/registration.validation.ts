// Registration Validation - Event-Centric Model
// ONE REGISTRATION = ONE EVENT = ONE TEAM (or SOLO)

import { z } from 'zod';
import { idSchema } from '../../utils/validators.js';

// Participant schema
const participantSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email format'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
    college: z.string().min(2, 'College name required').max(200),
    isLeader: z.boolean(),
});

// Create registration schema - SINGLE EVENT ONLY
export const createRegistrationSchema = z.object({
    eventId: idSchema,
    teamName: z.string().min(2, 'Team name must be at least 2 characters').max(100),
    participants: z.array(participantSchema)
        .min(1, 'At least one participant is required')
        .max(10, 'Maximum 10 participants allowed'),
}).refine(
    (data) => data.participants.filter(p => p.isLeader).length === 1,
    { message: 'Exactly one participant must be marked as leader', path: ['participants'] }
).refine(
    (data) => {
        const emails = data.participants.map(p => p.email.toLowerCase());
        return new Set(emails).size === emails.length;
    },
    { message: 'Duplicate emails not allowed in same registration', path: ['participants'] }
);

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;
export type ParticipantInput = z.infer<typeof participantSchema>;
