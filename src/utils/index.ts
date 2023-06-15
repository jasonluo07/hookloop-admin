import axios from 'axios';

export function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export async function POST<T>(url: string, params: T) {
  const res = await axios.post(url, params, {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
  return res.data;
}
