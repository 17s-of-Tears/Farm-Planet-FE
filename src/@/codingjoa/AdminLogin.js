import { signAdmin } from './ajax'

export default async function login(id, password) {
  try {
    await signAdmin({
      id, password
    });
  } catch(err) {
    return false;
  }
  return true;
}
