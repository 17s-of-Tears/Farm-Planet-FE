function getTimeIntl(jsonTime, isExpiry = false) {
  const date = isExpiry ? new Date(new Date(jsonTime) - 1) : new Date(jsonTime);
  return new Intl.DateTimeFormat('ko-KR', {
    hourCycle: 'h23',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
}
export function Time({
  children,
  expiry
}) {
  return getTimeIntl(children, expiry);
}
