import React from 'react'
import * as ReactRouter from 'react-router-dom'
import { getFarm, postFarm, updateFarm } from './ajax'
import { useAsyncView, useInputRef, useInputRefHandlar } from './hook'

function FarmEditor({
  id,
  payload,
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
    if(id===null) {
      postFarm(formData).then(() => history.go('/codingjoa'), err => 0);
    } else {
      updateFarm(id, formData).then(() => history.go('/codingjoa'), err => 0);
    }
  }, {
    name, yard, address, locationX, locationY, image,
  });
  return (
    <div>
      <div>
        이름 <input ref={name} />
      </div>
      <div>
        이미지 {imageView}
        <input ref={image} type="file" />
      </div>
      <div>
        평수 <input ref={yard} type="number" />
      </div>
      <div>
        주소 <input ref={address} />
      </div>
      <div>
        카카오 지도 좌표 X<input ref={locationX} />
      </div>
      <div>
        카카오 지도 좌표 Y<input ref={locationY} />
      </div>
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
}

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
