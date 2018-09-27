export const { NODE_ENV } = process.env;
const BACKEND_MOCK_URL = 'https://example.com';
export const BACKEND_ROOT_URL = NODE_ENV === 'test' ? BACKEND_MOCK_URL : process.env.REACT_APP_BASE_URL;
export const DOCUMENT_TITLE = 'Authors Haven';
export const REDIRECT_COUNTDOWN_DURATION = NODE_ENV === 'test' ? 1000 : 20000;
export const REDIRECT_COUNTDOWN_TICKER = NODE_ENV === 'test' ? 50 : 1000;

const constants = {
  NODE_ENV,
  BACKEND_ROOT_URL,
  DOCUMENT_TITLE,
  REDIRECT_COUNTDOWN_DURATION,
  REDIRECT_COUNTDOWN_TICKER,
};

export default constants;
