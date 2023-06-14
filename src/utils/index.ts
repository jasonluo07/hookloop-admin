import axios from 'axios';

export function sleep(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const GET = (uri: string, params: any) => {
  return new Promise((resolved, reject) => {
    fetch(`${uri}?${new URLSearchParams(params)}`, {
      method: 'GET',
      // @ts-ignore
      headers: {
        Authorization: sessionStorage.getItem('Authorization'),
      },
    })
      .then(response => {
        if (response.status === 200) return response.json();
        else throw new Error(`回傳碼 ${response.status} | 網路狀態 ${response.statusText}`);
      })
      .catch(error => reject(error))
      .then(data => {
        if (data && data.Unauthorization === true) return reject(data);
        else return resolved(data);
      });
  });
};

export async function POST<T>(url: string, params: T) {
  const res = await axios.post(url, params, {
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
  return res.data;
}
