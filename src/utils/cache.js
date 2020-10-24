import cookie from 'js-cookie';
import WebStorageCache from 'web-storage-cache';

const local = new WebStorageCache({ storage: 'localStorage' });

const session = new WebStorageCache({ storage: 'sessionStorage' });

export {
  local,
  session,
  cookie
};
