import { StrictMode } from 'react';

import { config as dotenvConfig } from 'dotenv';
import * as ReactDOM from 'react-dom/client';

import App from './App';

dotenvConfig();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
