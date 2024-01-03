import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './main/App';
import 'windi.css'
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './main/store'
import ErrorBoundary from './common/ErrorBoundary'
import 'src/access/nodespecific'

// **************start  记得把中间这段代码注释

if( process.env.NODE_ENV === 'development'){
  // import('../content/index').then((res:any)=>{
    // import('../insert/index').then((res)=>{
    //   const {initializeProvider}  = res
    //   initializeProvider()
    // })
  // })
}

// **************end  记得把中间这段代码注释

//bg 消息监听 监听获取到后 发送数据
if( process.env.NODE_ENV === 'development'){
    chrome?.runtime?.onMessage?.addListener(( request:any , sender:any) => {
      console.log(request , sender);
    })
}
  //@ts-ignore
globalThis.pageType = 'create'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <Provider store={store}>
      <HashRouter>
        <App/>
    </HashRouter>
    </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// reportWebVitals();
