import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

interface timezone {
    timezone: string,
    appointmentDate: string,
    appointmentTime: string,
    utcDate: string,
}

