import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>Cart calculator</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href="/favicon/icons8-cheque-96.png"
                />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}
