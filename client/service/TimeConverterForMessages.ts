function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
  
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    const diffInDays = Math.floor((currentDate.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
  
    if (diffInDays === 0) {
      return `${formatTime(date)}, Today`;
    } else if (diffInDays === 1) {
      return `${formatTime(date)}, Yesterday`;
    } else {
      return `${formatTime(date)}, ${formatDate(date)}`;
    }
  }
  
  function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }