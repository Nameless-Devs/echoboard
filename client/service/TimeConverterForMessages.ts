export function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    const dateToCompare = new Date(date.getTime());
    dateToCompare.setHours(0, 0, 0, 0);
  
    const diffInDays = Math.floor((currentDate.getTime() - dateToCompare.getTime()) / (24 * 60 * 60 * 1000));
  
    if (diffInDays === 0) {
      // Today
      return `${formatTime(date)}, Today`;
    } else if (diffInDays === 1) {
      // Yesterday
      return `${formatTime(date)}, Yesterday`;
    } else {
      // Other days
      return `${formatTime(date)}, ${formatDate(date)}`;
    }
  }
  
  function formatTime(date: Date): string {
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
  }
  
  function formatDate(date: Date): string {
    return date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  