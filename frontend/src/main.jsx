import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/index.js'
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactGA from 'react-ga4';
AOS.init({
  duration: 1000, // Animation duration in milliseconds
  once: false, // Animations happen only once on scroll
});
ReactGA.initialize('G-RM3WNDC6J1');
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
