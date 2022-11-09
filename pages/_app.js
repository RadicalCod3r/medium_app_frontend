import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script 
        src='https://kit.fontawesome.com/079998ba98.js' 
        crossOrigin="anonymous"
        strategy='lazyOnload'
        onLoad={() => console.log('Font Awesome is loaded now!')}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
