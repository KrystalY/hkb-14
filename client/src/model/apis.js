import { SERVER } from '@constant/constant.js';

const serverUrl = SERVER.API_DOMAIN;
const defaultOptions = (method) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
});

const createQuery = (data) => {
  return data
    ? '?' +
        Object.keys(data)
          .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
          .join('&')
    : '';
};

const POST = async (url = '', data) =>
  await fetch(`${serverUrl}${url}`, {
    body: JSON.stringify(data),
    ...defaultOptions('POST'),
  });

const PUT = async (url = '', data) =>
  await fetch(`${serverUrl}${url}`, {
    body: JSON.stringify(data),
    ...defaultOptions('PUT'),
  });

const GET = async (url = '', data) =>
  await fetch(`${serverUrl}${url}${createQuery(data)}`, defaultOptions('GET'));

const DELETE = async (url = '') =>
  await fetch(`${serverUrl}${url}`, defaultOptions('DELETE'));

export default {
  createRecord: async (data) => await POST('/record', data),
  findRecord: async ({ year, month }) => await GET(`/record/${year}/${month}`),
};
