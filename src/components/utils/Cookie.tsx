export function setCookie(expireTime: number, name: string, value: string): void {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + expireTime * 1000); // Convert seconds to milliseconds
  const domain = window.location.hostname;

  const expires = "expires=" + expirationDate.toUTCString();

  document.cookie = `${name}=${value}; ${expires}; path=/; domain=${domain}`;
}

export function getCookie(name: string): string {
  if (typeof document === 'undefined') {
    return '';
  }
  const cookie = document.cookie
    .split(';')
    .map(cookie => cookie.trim().split('='))
    .find(([cookieName]) => cookieName === name);

  return cookie ? cookie[1] : '';
}

