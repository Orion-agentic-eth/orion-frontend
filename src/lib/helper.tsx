import toast from 'react-hot-toast';
import { toastStyles } from '../config';

export const generateCodeVerifier = (): string => {
    const array = new Uint8Array(64);
    crypto.getRandomValues(array);

    return Array.from(array, (byte) =>
        ('0' + byte.toString(16)).slice(-2)
    ).join('');
};
const sha256 = async (message: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return crypto.subtle.digest('SHA-256', data);
};
const base64UrlEncode = (arrayBuffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(arrayBuffer);
    const base64String = btoa(String.fromCharCode(...bytes));
    return base64String
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};
export const generateCodeChallenge = async (
    codeVerifier: string
): Promise<string> => {
    const hashedBuffer = await sha256(codeVerifier);
    return base64UrlEncode(hashedBuffer);
};
export const scheduleEvent = async () => {
    const token = localStorage.getItem('googleAuth');

    const event = {
        summary: 'Scheduled Call',
        start: {
            dateTime: new Date().toISOString(),
            timeZone: 'Asia/Kolkata',
        },
        end: {
            dateTime: new Date(new Date().getTime() + 30 * 60000).toISOString(),
            timeZone: 'Asia/Kolkata',
        },
    };

    try {
        const response = await fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            }
        );

        const data = await response.json();

        if (response.ok && data.htmlLink) {
            toast.success(`Event Scheduled successfully`, toastStyles);
            return data.htmlLink;
        } else {
            return toast.error(
                `Failed to schedule event: ${data.error?.message}`,
                toastStyles
            );
        }
    } catch (error) {
        toast.error('Error scheduling event:', toastStyles);
    }
};
