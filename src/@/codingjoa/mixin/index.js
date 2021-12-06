import { useAsyncView } from '@/codingjoa/hook'

export function MixInList(getListAjax, createView) {
  return function MixInList() {
    const [ View, state ] = useAsyncView((payload, callback) => {
      getListAjax(payload).then(data => callback({
        code: 1,
        data,
      }), err => callback({
        code: -1,
        data: {
          code: err?.response?.status,
          message: err?.response?.data?.message,
        },
      }));
    });

    return <View>
      {state?.data && createView(state.data)}
    </View>
  }
}

export function MixInEditor(
  getDetailAjax,
  handleSubmit,
  ViewIn,
) {
  if(!getDetailAjax) {
    return function MixInEditor() {
      return <ViewIn payload={{}} id={null} onSubmit={(payload, callback) => handleSubmit(null, payload, callback)} />
    }
  }

  return function MixInEditor({
    id
  }) {
    const [ View, state ] = useAsyncView((payload, callback) => {
      getDetailAjax(payload).then(data => callback({
        code: 1,
        data,
      }), err => callback({
        code: -1,
        data: {
          code: err?.response?.status,
          message: err?.response?.data?.message,
        },
      }));
    }, {
      id,
    });
    if(!state?.data) {
      return null;
    }
    return <ViewIn payload={state.data} id={id} onSubmit={(payload, callback) => handleSubmit(id, payload, callback)} />
  }
}
