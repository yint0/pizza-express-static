// use localStorage to store the authority info, which might be sent from server in actual project.
import Cookie from 'js-cookie';

export function getRole() {
  if (!Cookie.get('X-TOKEN')) {
    return null;
  }
  return Cookie.get('role');
}

export function getToken() {
  return Cookie.get('token');
}

export function getCurrentUser() {
  return { name: Cookie.get('name'), avatar: Cookie.get('avatar') };
}

export function setAuthority(payload) {
  const { token, until, avatar, role, name } = payload;
  const time = new Date(until);
  Cookie.set('token', token, {
    expires: time,
  });
  Cookie.set('role', role, {
    expires: time,
  });
  Cookie.set('name', name, {
    expires: time,
  });
  Cookie.set('avatar', avatar, {
    expires: time,
  });
}
