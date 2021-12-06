import React from 'react'
/*
function asyncDispatch(state, action) {
  if(action.error) {
    return {
      code: 1,
      data: null,
      error: action.error,
    }
  } else if(action.data) {
    return {
      code: 2,
      data: action.data,
      error: null,
    }
  }
  return state;
}

export function useAsyncState(handlar, payload = 0) {
  const [ state, dispatch ] = React.useReducer(asyncDispatch, {
    code: 0,
    data: null,
    error: null,
  });
  const memoizedHandlar = React.useCallback(handlar, [ handlar ]);
  const memoizedPayload = React.useMemo(() => payload, [ payload ]);
  const force = React.useCallback(async () => {
    try {
      const data = await memoizedHandlar(memoizedPayload);
      dispatch({
        data,
      });
    } catch(err) {
      dispatch({
        error: {
          status: err.response?.state,
          message: err.response?.data?.message ?? err.message,
        },
      });
    }
  }, [ memoizedHandlar, memoizedPayload ]);
  console.log(force);
  React.useLayoutEffect(() => {
    force();
  }, [ force ]);
  return [ state, force ];
}

export function useView(creator, state) {
  const view = React.useMemo(() => {
    if(!state.code) {
      return <>...</>
    }
    return <>{creator instanceof Function && creator(state.data)}</>;
  }, [ state, creator ]);
  return view;
}
*/
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

/*
fnction pageCalculator(page, newPageSize) {
  if(newPageSize < page) {
    return newPageSize;
  } else if(1 > page) {
    return 1;
  }
  return page;
}
*/
export function useViewDispatch({
  effect,
  view,
  reducer,
  initialValue,
}) {
  const [ state, dispatch ] = React.useReducer(reducer, initialValue);
  React.useLayoutEffect(() => {
    return effect(state, dispatch);
  }, [ effect, state ]);
  const page = React.useMemo(() => {
    return view(state, dispatch);
  }, [ view, state ]);
  return page;
}
