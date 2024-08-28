import React, { useEffect, useState } from 'react';

interface AppointmentTimerProps {
    appointmentDate: string;
    appointmentTime: string;
}

export function formatDate(dateString: string): string {
  const trimmedDateString = dateString.substring(3);
    const date = new Date(trimmedDateString);
    const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

const AppointmentTimer: React.FC<AppointmentTimerProps> = ({ appointmentDate, appointmentTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [joinEnabled,setJoinEnabled] = useState<boolean>(false);


  function convertTo24Hour(time: string): string {
    const [hour, minutePart] = time.split(':');
    const minutes = minutePart.slice(0, 2);
    const period = minutePart.slice(2).trim();
  
    let hourIn24 = parseInt(hour);
  
    if (period.toLowerCase() === 'pm' && hourIn24 < 12) {
      hourIn24 += 12;
    } else if (period.toLowerCase() === 'am' && hourIn24 === 12) {
      hourIn24 = 0;
    }
  
    return `${hourIn24.toString().padStart(2, '0')}:${minutes}`;
  }

  useEffect(() => {
      const timer = setInterval(() => {
          const formattedDate = formatDate(appointmentDate)
          const formattedTime = convertTo24Hour(appointmentTime);
          const appointmentDateTime = new Date(`${formattedDate}T${formattedTime}`).getTime();
          const now = new Date().getTime();
          const distance = appointmentDateTime - now;

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);

          if (distance < 0) {
              clearInterval(timer);
              setTimeLeft('No Upcoming Appointment');
          } else if (distance <= 10*60*1000) {            //function to show join button when 20 minute is left
              setJoinEnabled(true)
          }
      }, 1000);

      return () => {
          clearInterval(timer);
      };
  }, [appointmentDate, appointmentTime]);

  return (
    <div>
        {timeLeft !== 'No Upcoming Appointment' ? `Time left until appointment: ${timeLeft}` : timeLeft}
    </div>
);
};

export default AppointmentTimer;