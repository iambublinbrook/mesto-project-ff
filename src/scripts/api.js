const token = '600ff3c5-dec1-43d8-a99c-2099edf0c668';
const group = 'wff-cohort-36';
const config = {
  baseUrl: `https://nomoreparties.co/v1/${group}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
};

function request(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(request)
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(request)
}

const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(request)
}

const addNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(request)
}

const removeCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(request)
}

const likeCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(request)
}

const unLikeCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(request)
}

const updateUserAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    })
  })
    .then(request)
}

export {

  getInitialCards,
  getUserInfo,
  updateUserInfo,
  addNewCard,
  removeCard,
  likeCard,
  unLikeCard,
  updateUserAvatar

};

