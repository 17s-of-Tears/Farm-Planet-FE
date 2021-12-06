import React from 'react'
import * as ReactRouter from 'react-router-dom'
import { getFarm, postFarm, updateFarm, deleteFarm } from './ajax'
import { useInputRef, useInputRefHandlar } from './hook'
import { MixInEditor } from './mixin'

function FarmEditorModel({
  id,
  payload,
  onSubmit,
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
    /*
    if(id===null) {
      postFarm(formData).then(() => history.go('/codingjoa'), err => 0);
    } else {
      updateFarm(id, formData).then(() => history.go('/codingjoa'), err => 0);
    }
    */
  }, {
    name, yard, address, locationX, locationY, image,
  });
  const handleDelete = id>0 && (e => {
    e.preventDefault();
    deleteFarm({ id }).then(() => history.go('/codingjoa'), err => 0);
  });
  return (
    <table>
      <tbody>
        <tr>
          <th>번호</th>
          <td>{id}</td>
        </tr>
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
          <td colspan="2">
            <button onClick={handleSubmit}>등록</button>
            <button onClick={handleDelete} disabled={!handleDelete}>삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}


const FarmEditor = MixInEditor(
  getFarm,
  (id, formData, callback) => {
    updateFarm(id, formData).then(() => callback(), err => 0);
  },
  FarmEditorModel,
);
export default function FarmEditorMain() {
  //const params = ReactRouter.useParams();
  const params = { id: 4 };
  return <>{params.id>0 && <FarmEditor id={params.id} />}</>
}

const FarmEditor2 = MixInEditor(
  null,
  (id, formData, callback) => {
    postFarm(formData).then(() => callback(), err => 0);
  },
  FarmEditorModel,
);

/*
export default function FarmEditorMain({
  id
}) {
  const [ View, state, force ] = useAsyncView((payload, callback) => {
    getFarm(payload).then(data => callback({
      code: 1,
      data,
    }), err => 0);
  }, {
    id,
  }, {
    autostart: false,
  });
  React.useLayoutEffect(() => {
    if(id > 0) {
      force({
        id,
      });
    }
  }, [ id ]);
  return (
    <>
      {!id && <FarmEditor id={null} payload={{}} />}
      {id>0 && <FarmEditor id={id} payload={state.data} />}
    </>
  );
}
*/
