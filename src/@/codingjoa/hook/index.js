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

export function useAsyncView(handlar, payload) {
  const [ data, dispatch ] = React.useReducer(reducer, { code: 0, payload });
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
      return () => <>오류 발생 [{data?.data?.code} {data?.data?.message}]</>
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
