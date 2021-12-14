import { closeSubscribe } from '@/codingjoa/ajax'

function state(subscribed, pending) {
  if(pending === 1) {
    return '작물 선택 대기중';
  }
  if(subscribed === 1) {
    return '구독중';
  }
  return '구독 만료됨';
}

function plan(level) {
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

export default function FarmInfo({
  id,
  payload,
  dispatch,
}) {
  const Row = row => (
    <div key={row.id} className="plantItem">
    <h6>{row.name}</h6>
      <div className="imageCardBox">
        <img width="128px" src={`https://codingjoa.kro.kr:49000/${row.imageUrl}`} />
        <button onClick={() => dispatch({ type: 'edit', id: row.id })} className="updateBtn">관리</button>
      </div>
    </div>
  );
  const handleDelete = e => {
    e.preventDefault();
    const ok = window.confirm('해당 구독을 만료 처리합니다. 계속 하시겠습니까?');
    if(!ok) {
      return;
    }
    closeSubscribe({
      id,
    }).then(
      () => dispatch({ type: 'refresh' }),
      err => alert('처리 실패.')
    );
  };

  return <div className="infoBox">
    <h5>이름 : {payload.subscribe.userName}</h5>
    <h5>구독일 : {payload.subscribe.createdAt}</h5>
    <h5>밭 : {payload.subscribe.farmName}</h5>
    <h5>주소 : {payload.subscribe.address}</h5>
    <h5>좌표 : [{payload.subscribe.locationX},{payload.subscribe.locationY}]</h5>
    <h5>구독 플랜 : {plan(payload.subscribe.level)}</h5>
    <h5>구독 상태 : {state(payload.subscribe.subscribed, payload.subscribe.pending)}</h5>
    <div className="farmGridBox">
      <img width="256px" src={`https://codingjoa.kro.kr:49000/${payload.subscribe.imageUrl}`} />
    </div>
    <div>
      <button onClick={() => dispatch({ type: 'editFarm' })}>밭 정보 수정</button>
      <button onClick={handleDelete} disabled={payload.subscribe.subscribed!==1}>구독 만료 처리</button>
    </div>

    <h5>작물 수: {payload.subscribe.plants}</h5>
    <div className="plantGridBox">
      {payload.plants.map && payload.plants.map(Row)}
    </div>
  </div>
}
