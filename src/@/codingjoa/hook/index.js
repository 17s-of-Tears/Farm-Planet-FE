import React from 'react'

function reducer(state, action) {
  if(action.code) {
    return {
      ...state,
      code: action.code,
      data: action.data,
    };
  }
  return state;
}

export function useAsyncView(handlar, payload, option) {
  const { autostart } = option ?? { autostart: true };
  const [ data, dispatch ] = React.useReducer(reducer, { code: autostart ? 0 : -2, payload });
  const loader = React.useCallback((payload, option) => {
    if(data.code === 0 || option?.force === true) {
      handlar instanceof Function && handlar({ ...data.payload, ...payload }, dispatch);
    }
  }, [ data, handlar ]);
  const force = payload => loader(payload, { force: true });
  const View = React.useMemo(() => {
    if(data.code === 0) {
      return () => <>...</>;
    } else if(data.code === -1) {
      return () => <>오류 발생 [{data?.data?.code} {data?.data?.message}]</>;
    } else if(data.code === -2) {
      return () => <></>;
    }
    return ({
      children,
    }) => <>{children}</>;
  }, [ data ]);
  React.useLayoutEffect(() => {
    loader();
  }, [ loader ]);
  return [
    View, data, force
  ];
}

export function useInputRef(initialValue) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if(ref.current) {
      ref.current.value = initialValue;
    }
  }, [ initialValue ]);
  return ref;
}

export function useInputRefHandlar(onSubmit, refs) {
  const handleSubmit = e => {
    e?.preventDefault && e.preventDefault();
    const payload = {};
    let multipart = false;
    for(const key in refs) {
      if(!!refs[key].current?.files) {
        payload[key] = refs[key].current.files[0];
        multipart = true;
      } else {
        payload[key] = refs[key].current.value;
      }
    }
    if(multipart) {
      const formData = new FormData();
      for(const key in payload) {
        formData.append(key, payload[key]);
      }
      onSubmit(formData);
    } else {
      onSubmit(payload);
    }
  }
  return handleSubmit;
}
