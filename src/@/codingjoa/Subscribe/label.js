export function state(subscribed, pending) {
  if(pending === 1) {
    return '작물 선택 대기중';
  }
  if(subscribed === 1) {
    return '구독중';
  }
  return '구독 만료됨';
}

export function plan(level) {
  switch(level) {
    case 1:
    return '베이직';
    case 2:
    return '스탠다드';
    case 3:
    return '프리미어';
  }
  return '';
}
