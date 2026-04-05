const SERVER_URL = 'https://book-store-management-system-server.onrender.com/api/categories';
export const pingServer = () => {
  fetch(SERVER_URL, { method: 'GET' }).catch(() => {});
};
