import React from 'react';
import ReactDOM from 'react-dom/client';

import cmsPostStore from './store/cms-post';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App cmsPost={cmsPostStore()} />
  </React.StrictMode>
);
