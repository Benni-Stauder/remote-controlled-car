import React from 'react';
import App from './components/App'; // Adjust the path as necessary if your folder structure is different
import './index.css'; // Assuming you have some global styles you want to include
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="/" />);
