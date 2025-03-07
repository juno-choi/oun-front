import { useState, useEffect } from 'react';

export default function DateDisplay({ dateTimeString, className }) {
  const [formattedDate, setFormattedDate] = useState('');
  
  useEffect(() => {
    if (dateTimeString) {
      const date = new Date(dateTimeString);
      
      const year = date.getFullYear().toString().slice(2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      setFormattedDate(`${year}.${month}.${day} ${hours}:${minutes}`);
    }
  }, [dateTimeString]);
  
  return <span className={className}>{formattedDate}</span>;
}