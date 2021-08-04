// import 'tailwindcss/tailwind.css'
import { useEffect, useReducer } from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';

import { AddressContext } from '../store/addressContext';
import AddressReducer from '../store/addressReducer';
import Head from "next/head";
import Script from 'next/script'



function MyApp({ Component, pageProps }) {

  const [address, dispatch] = useReducer(AddressReducer);

  useEffect(() => {
    if (!address) {
      dispatch({
        type: 'UPDATE_ADDRESS',
        payload: localStorage.getItem('address')
      });
    }
  }, []);

  return (
    <AddressContext.Provider value={{ state: address, dispatch: dispatch }}>
      <>
        <Layout dispatch={dispatch} address={address} >
          <Head>
            <link
              rel="preload"
              href="/fonts/FontsFree-Net-Lulo-Clean-W01-One-Bold.ttf"
              as="font"
              crossOrigin=""
            />
            <script src="countdown.min.js" />

          </Head>
          <Component address={address} {...pageProps} />
        </Layout>
      </>
    </AddressContext.Provider>
  );
}

export default MyApp;
