const token = '600ff3c5-dec1-43d8-a99c-2099edf0c668';
const group = 'wff-cohort-34';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${group}`,
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

function makeRequest(endpoint, method = 'GET', body = null) {
  const url = `${config.baseUrl}${endpoint}`;
  const options = {
    method,
    headers: config.headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // Возвращаем ошибку
    return Promise.reject({
      status: res.status,
      message: `Ошибка при выполнении запроса ${res.url}. Статус ${res.status}`,
    });
  });
}

export function getUserInfo() {
  return makeRequest('/users/me', 'GET');
}

export function getInitialCards() {
  return makeRequest('/cards', 'GET');
}

export function updateUserInfo(name, about) {
  return makeRequest('/users/me', 'PATCH', { name, about });
}

export function addNewCard(name, link) {
  return makeRequest('/cards', 'POST', { name, link });
}

export function deleteCard(cardId) {
  return makeRequest(`/cards/${cardId}`, 'DELETE');
}

export function likeCard(cardId) {
  return makeRequest(`/cards/likes/${cardId}`, 'PUT');
}

export function unlikeCard(cardId) {
  return makeRequest(`/cards/likes/${cardId}`, 'DELETE');
}


export function updateUserAvatar(avatar) {
  return makeRequest('/users/me/avatar', 'PATCH', { avatar });
}

export function getInitialData(onSuccess, onError) {
  const cards = makeRequest('/cards');
  const profile = makeRequest('/users/me');

  Promise.all([cards, profile])
    .then(([cards, profile]) => onSuccess(cards, profile))
    .catch((error) => onError(error));
}
//проверка
makeRequest('/cards', 'GET')
  .then((data) => console.log('Карточки:', data))
  .catch((error) => console.error('Ошибка:', error));
