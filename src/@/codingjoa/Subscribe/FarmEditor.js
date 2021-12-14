import React from 'react'
import { updateSubscribe } from '@/codingjoa/ajax'
import { useInputRef, useInputRefHandlar } from '@/codingjoa/hook'

export default function Editor({
  id,
  payload,
  dispatch,
}) {
  const farmName = useInputRef(payload?.farmName ?? '');
  const yard = useInputRef(payload?.yard ?? '');
  const address = useInputRef(payload?.address ?? '');
  const locationX = useInputRef(payload?.locationX ?? '');
  const locationY = useInputRef(payload?.locationY ?? '');
  const image = React.useRef(null);
  const imageView = (payload?.imageUrl) ? <img height="64px" src={`https://codingjoa.kro.kr:49000/${payload.imageUrl}`} alt={`farm_id${id}`} /> : null;
  const complete = () => dispatch({ type: 'refresh' });
  const handleSubmit = useInputRefHandlar(formData => {
    updateSubscribe(id, formData).then(
      () => complete(),
      err => 0
    );
  }, {
    farmName, yard, address, locationX, locationY, image,
  });
  return (<div className="adminFarm-write">
    <table className="tableStyle_2">
      <tbody>

        {id &&<tr><th>번호</th><td>{id}</td></tr>}
        <tr>
          <th>이름</th>
          <td><input ref={farmName} /></td>
        </tr>
        <tr>
          <th rowspan="2">이미지</th>
          <td>{imageView}</td>
        </tr>
        <tr>
          <input ref={image} type="file" />
        </tr>
        <tr>
          <th>평수</th>
          <td><input ref={yard} type="number" /></td>
        </tr>
        <tr>
          <th>주소 </th>
          <td><input ref={address} /></td>
        </tr>
        <tr>
          <th>카카오 지도 좌표 X</th>
          <td><input ref={locationX} /></td>
        </tr>
        <tr>
          <th>카카오 지도 좌표 Y</th>
          <td><input ref={locationY} /></td>
        </tr>
      </tbody>
    </table>
    <div className="btnBox">
      <button onClick={() => complete()} className="cancleBtn">취소</button>
      <button onClick={handleSubmit} className="submitBtn">등록</button>
    </div>
  </div>

  );
}
