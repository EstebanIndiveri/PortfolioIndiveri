
import React from 'react';
import App,{Container} from 'next/app';
import auth0 from '../services/auth0';
import{ToastContainer}from 'react-toastify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


//styles
import 'react-toastify/dist/ReactToastify.css';
import '../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// const namespace='http://localhost:3000';
// function MyApp({ Component, pageProps,ctx }) {
export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // const isSiteOwner = user && user[process.env.NAMESPACE + '/role'] === 'siteOwner';

    const isSiteOwner = user && user [process.env.NAMESPACE + '/role'] === 'siteOwner';
    const auth = { user, isAuthenticated: !!user, isSiteOwner };

    return { pageProps, auth }
  }
    render(){
      const{Component,pageProps,auth}=this.props;
      return(
        <>
          <ToastContainer/>
          <Component{...pageProps} auth={auth}/>
        </>
      )
    }  
  }
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  