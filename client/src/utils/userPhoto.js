export function userPhotoUrl(photo) {
  return `/img/users/${photo || 'default.jpg'}`;
}
