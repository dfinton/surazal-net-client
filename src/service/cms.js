import axios from 'axios';

const cmsApiUrl = `${process.env.REACT_APP_CMS_API_URL}`;

const cms = async (query) => {
  const response = await axios({
    url: cmsApiUrl,
    method: 'post',
    data: { query },
  });

  if (!(response && response.data && response.data.data)) {
    throw new Error('No data returned from Posts API in CMS');
  }

  return response.data.data;
};

export default cms;
