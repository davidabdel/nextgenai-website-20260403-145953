import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import posthog from 'posthog-js';
import App from './App.tsx';
import './index.css';

posthog.init('phc_tiHTiiGHu7JVsE2Woxr5h42UVJpyjXP2KChGYWjwuAhM', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
