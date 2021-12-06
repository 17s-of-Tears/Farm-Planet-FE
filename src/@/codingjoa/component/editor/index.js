import React from 'react'
import * as ReactRouter from 'react-router-dom'
import { useInputRef, useInputRefHandlar } from './hook'

function errorHandlar = err => {
  alert(`실패: [${err?.response?.status}/${err?.response?.data?.message}]`);
};


export function AdminAccountEditor({
  onSubmit,
}) {
  const history = ReactRouter.useHistory();
  const name = useInputRef('');
  const accountID = useInputRef('');
  const handleSubmit = useInputRefHandlar(payload => {
    onSubmit(payload);

    /*
    postAccount(payload).then(data => {
      alert(`임시 비밀번호 생성 완료: [${data.password}]`);
      history.go(0);
    }, err => alert(`추가 실패. [${err?.response?.status}/${err?.response?.data?.message}]`));
    */
  }, {
    name,
    accountID
  });
  return <table>
    <thead>
      <tr>
        <th>이름</th>
        <th>accountID</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <input ref={name} />
        </td>
        <td>
          <input ref={accountID} />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button onClick={handleSubmit}>제출</button>
        </td>
      </tr>
    </tbody>
  </table>;
}

export function FarmEditor({
  id,
  payload,
  onSubmit
}) {
  const history = ReactRouter.useHistory();
  const name = useInputRef(payload?.name ?? '');
  const yard = useInputRef(payload?.yard ?? '');
  const address = useInputRef(payload?.address ?? '');
  const locationX = useInputRef(payload?.locationX ?? '');
  const locationY = useInputRef(payload?.locationY ?? '');
  const image = React.useRef(null);
  const imageView = (payload?.imageUrl) ? <img height="64px" src={`https://codingjoa.kro.kr:49000/${payload.imageUrl}`} alt={`farm_id${id}`} /> : null;
  const handleSubmit = useInputRefHandlar(formData => {
    onSubmit(formData, () => history.go('/codingjoa'));
  }, {
    name, yard, address, locationX, locationY, image,
  });
  return (
    <table>
      <tbody>
        <tr>
          <th>이름</th>
          <td><input ref={name} /></td>
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
        <tr>
          <td colspan="2"><button onClick={handleSubmit}>등록</button></td>
        </tr>
      </tbody>
    </table>
  );
}
