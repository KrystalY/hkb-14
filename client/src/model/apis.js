import { SERVER } from '@constant/constant.js';

const serverUrl = SERVER.API_DOMAIN;
const defaultOptions = (method) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

const GET = async (url = '') =>
  await fetch(`${serverUrl}${url}`, defaultOptions('GET'));

const DELETE = async (url = '') =>
  await fetch(`${serverUrl}${url}`, defaultOptions('DELETE'));

export default {
  createRecord: async (data) => await POST('/record', data),
  getRecord: async ({ year, month }) => await GET(`/record/${year}/${month}`),
  getCategory: async () => await GET(`/user/category`),
  getPaymentMethod: async (user) =>
    await GET(`/user/payment-method/${user.key}`),
  createPaymentMethod: async (data) =>
    await POST('/user/payment-method/create', data),
  disablePaymentMethod: async (data) =>
    await POST('/user/payment-method/disable', data),
  enablePaymentMethod: async (data) =>
    await POST('/user/payment-method/enable', data),
};
