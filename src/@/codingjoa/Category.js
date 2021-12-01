import { getCategories } from './ajax'
import { useAsyncView } from './hook'
export default function Category() {
  const [ View, state ] = useAsyncView((payload, callback) => {
    getCategories(payload).then(data => callback({
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
  return <View>{JSON.stringify(state.data)}</View>
}
