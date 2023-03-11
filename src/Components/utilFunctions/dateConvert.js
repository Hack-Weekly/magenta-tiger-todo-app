export default function dateConvert(timestamp) {
  const date = new Date(timestamp);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);

  return formattedDate;
}

export function formatDueDate(dateObj) {
  const now = new Date();
  const convertedDate = new Date(dateObj.seconds * 1000);

  if (now.toDateString() === convertedDate.toDateString()) {
    return 'Due Today';
  } else {
    const convertedDateString = convertedDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    if (now < convertedDate) {
      return `Due ${convertedDateString}`;
    } else {
      return `Overdue ${convertedDateString}`;
    }
  }
}
