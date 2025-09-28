import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store'
import { Provider } from 'react-redux'
import { setScriptKey } from '@progress/kendo-licensing'
import { KENDO_LICENSE_KEY } from './kendo-license.js'

// Configure Kendo UI license key
console.log('Setting Kendo license key:', KENDO_LICENSE_KEY);
setScriptKey(KENDO_LICENSE_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
