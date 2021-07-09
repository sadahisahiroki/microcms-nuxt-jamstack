const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

exports.handler = async (event) => {
  const { id, draftKey } = event.queryStringParameters;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "id" query parameter',
      }),
    };
  }
  return axios
    .get(
      `https://jam-jam2-1.microcms.io/api/v1/blog/${id}?draftKey=${draftKey}`,
      {
        headers: { 'X-API-KEY': API_KEY },
      }
    )
    .then(({ data }) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => {
      return {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data),
      }
    });
};
