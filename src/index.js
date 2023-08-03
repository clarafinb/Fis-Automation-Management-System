import 'react-app-polyfill/stable'
import 'core-js'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './config/redux/store'

createRoot(document.getElementById('root')).render(
  <Suspense
    fallback={
      <div className='flex w-full h-screen justify-center items-center'>
        <img src="/gif/Floading.gif" alt="" />
      </div>
    }
  >
    <Provider store={store}>
      <App />
    </Provider>,
  </Suspense>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
