import axios from 'axios'
axios.defaults.baseURL = 'https://codingjoa.kro.kr:49000/'
axios.defaults.withCredentials = true;

export async function signAdmin({
  id,
  password,
}) {
  await axios({
    method: 'POST',
    url: '/api/v1/admin/sign',
    data: {
      id,
      password,
    },
  });
}

export async function signoutAdmin() {
  await axios({
    method: 'DELETE',
    url: '/api/v1/admin/sign',
  });
}

export async function getMyInfo() {
  const result = await axios({
    method: 'GET',
    url: '/api/v1/admin',
  });
  return result.data;
}

export async function getBoardNotices({
  page = 1,
  pageSize = 15,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/board/notice?page=${page}&pageSize=${pageSize}`,
  });
  return result.data;
}

export async function getBoardNotice({
  id,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/board/notice/${id}`,
  });
  return result.data;
}

export async function postBoardNotice({
  title,
  content,
}) {
  await axios({
    method: 'POST',
    url: '/api/v1/admin/board/notice',
    data: {
      title,
      content,
    },
  });
}

export async function updateBoardNotice({
  id,
  title,
  content,
}) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/board/notice/${id}`,
    data: {
      title,
      content,
    },
  });
}

export async function deleteBoardNotice({
  id,
}) {
  await axios({
    method: 'DELETE',
    url: `/api/v1/admin/board/notice/${id}`,
  });
}

export async function getBanners() {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/category/banner`,
  });
  return result.data;
}

export async function postBanner(formData) {
  await axios({
    method: 'POST',
    url: `/api/v1/admin/category/banner`,
    data: formData,
  });
}

export async function deleteBanner({
  id
}) {
  await axios({
    method: 'DELETE',
    url: `/api/v1/admin/category/banner/${id}`,
  });
}

export async function getCategories({
  page = 1,
  pageSize = 15,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/category?page=${page}&pageSize=${pageSize}`,
  });
  return result.data;
}

export async function getCategory({
  id
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/category/${id}`,
  });
  return result.data;
}

export async function postCategory(formData) {
  await axios({
    method: 'POST',
    url: '/api/v1/admin/category',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function updateCategory(id, formData) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/category/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function deleteCategory({
  id
}) {
  await axios({
    method: 'DELETE',
    url: `/api/v1/admin/category/${id}`,
  });
}

export async function getPlants({
  page = 1,
  pageSize = 15,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/category/plant?page=${page}&pageSize=${pageSize}`,
  });
  return result.data;
}

export async function getPlant({
  id,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/category/plant/${id}`,
  });
  return result.data;
}

export async function postPlant(formData) {
  await axios({
    method: 'POST',
    url: '/api/v1/admin/category/plant',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function updatePlant(id, formData) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/category/plant/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function deletePlant({
  id
}) {
  await axios({
    method: 'DELETE',
    url: `/api/v1/admin/category/plant/${id}`,
  });
}

export async function getAccounts({
  page = 1,
  pageSize = 15,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/account?page=${page}&pageSize=${pageSize}`,
  });
  return result.data;
}

export async function postAccount({
  accountID,
  name,
}) {
  const result = await axios({
    method: 'POST',
    url: '/api/v1/admin/account',
    data: {
      accountID,
      name,
    },
  });
  return result.data;
}

export async function updateAccount({
  id,
  name,
}) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/account/${id}`,
    data: {
      name,
    },
  });
}

export async function resetPassword({
  id,
}) {
  const result = await axios({
    method: 'PUT',
    url: `/api/v1/admin/account/${id}/pw`,
  });
  return result.data?.password ?? null;
}

export async function getUsers({
  page = 1,
  pageSize = 15,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/user?page=${page}&pageSize=${pageSize}`,
  });
  return result.data;
}

export async function updateUser({
  id,
  name,
}) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/user/${id}`,
    data: {
      name,
    },
  });
}

export async function getFarms({
  page = 1,
  pageSize = 15,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/farm?page=${page}&pageSize=${pageSize}`,
  });
  return result.data;
}

export async function getFarm({
  id
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/farm/${id}`,
  });
  return result.data;
}

export async function postFarm(formData) {
  await axios({
    method: 'POST',
    url: '/api/v1/admin/farm',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function updateFarm(id, formData) {
  await axios({
    method: 'PUT',
    url: `/api/v1/admin/farm/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}

export async function deleteFarm({
  id,
}) {
  await axios({
    method: 'DELETE',
    url: `/api/v1/admin/farm/${id}`,
  });
}

export async function getSubscribes({
  page = 1,
  pageSize = 15,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/subscribe?page=${page}&pageSize=${pageSize}`,
  });
  return result.data;
}

export async function getSubscribe({
  id
}) {
  const subscribe = await axios({
    method: 'GET',
    url: `/api/v1/admin/subscribe/${id}`,
  });
  const plants = await axios({
    method: 'GET',
    url: `/api/v1/admin/subscribe/${id}/plant`,
  });
  return {
    subscribe: subscribe.data,
    plants: plants.data,
  };
}

export async function getSubscribePlant({
  subscribeId,
  subscribePlantId,
}) {
  const result = await axios({
    method: 'GET',
    url: `/api/v1/admin/subscribe/${subscribeId}/plant/${subscribePlantId}`,
  });
  return result.data;
}

export async function postSubscribePlant(
  subscribeId,
  subscribePlantId,
  formData
) {
  await axios({
    method: 'POST',
    url: `/api/v1/admin/subscribe/${subscribeId}/plant/${subscribePlantId}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
}
