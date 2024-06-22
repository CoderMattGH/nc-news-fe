const BASE_API_URL = `https://nc-news-api.codermatt.com/api`;

const ARTICLES_API_URL = `${BASE_API_URL}/articles`;
const USERS_API_URL = `${BASE_API_URL}/users`;
const COMMENTS_API_URL = `${BASE_API_URL}/comments`;

const ERR_MSG_NOT_LOGGED_IN = 'You must be logged in to perform this action :(';

const COMMENT_MAX_LENGTH = 1000;

export default {BASE_API_URL, ARTICLES_API_URL, USERS_API_URL, COMMENTS_API_URL, 
    ERR_MSG_NOT_LOGGED_IN, COMMENT_MAX_LENGTH};