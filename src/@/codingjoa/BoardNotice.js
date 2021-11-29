import React from 'react'
import { getBoardNotices } from './ajax'
import { useAsyncView } from './hook'

export default function BoardNotice() {
  const [ View, data ] = useAsyncView((payload, callback) => {
    getBoardNotices(payload).then(data => callback({
      code: 1,
      data,
    }), err => callback({
      code: -1,
      data: {
        code: err?.response?.data?.status,
        message: err?.response?.data?.message,
      },
    }));
  });
  console.log(data);
  return (
    <View>{JSON.stringify(data)}</View>
  );
}
