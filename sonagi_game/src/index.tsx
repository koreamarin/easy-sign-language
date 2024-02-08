import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from "./redux/store/store";
import App from './App';
import Sonagi from './components/Sonagi/Sonagi';
import './index.css';
import ReactDOM from 'react-dom/client';


const container = document.getElementById('root')!;
// const root = createRoot(container);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App/> */}
      <Sonagi></Sonagi>
    </Provider>
  </React.StrictMode>
);
