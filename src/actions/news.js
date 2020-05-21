export const NAMESPACE = 'news';

export function GET_NEWS_LIST(payload) {
  return {
    type: `${NAMESPACE}/getNewsList`,
    payload,
  };
}
