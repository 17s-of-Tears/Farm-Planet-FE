import React from 'react'
import * as ReactRouter from 'react-router-dom'
import { getBanners, postBanner, deleteBanner } from './ajax'
import { useAsyncView, useInputRefHandlar } from './hook'

function AddBanner() {
  const history = ReactRouter.useHistory();
  const image = React.useRef(null);
  const handleSubmit = useInputRefHandlar(formData => {
    postBanner(formData).then(() => history.go(0), err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`));
  }, {
    image,
  })
  return (
    <div>
      배너 추가
      <input ref={image} type="file" />
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
}

function Row(row, index) {
  const history = ReactRouter.useHistory();
  const handleDelete = e => {
    e.preventDefault();
    deleteBanner({
      id: row.id,
    }).then(() => history.go(0), err => alert(`삭제 실패. [${err?.response?.status}/${err?.response?.data?.message}]`));
  };
  return (
    <div key={index}>
      <img src={`https://codingjoa.kro.kr:49000/${row.imageUrl}`} alt={`banner_id${row.id}`} />
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default function Banner() {
  const [ View, state ] = useAsyncView((payload, callback) => {
    getBanners().then(
      data => callback({
        code: 1,
        data,
      }),
      err => alert(`조회 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
    );
  });
  return <View>
    <AddBanner />
    {state.data?.map && state.data.map(Row)}
  </View>;
}
