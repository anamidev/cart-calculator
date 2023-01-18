import '@/styles/globals.css'
import Layout from "@/components/Layout";
import {Provider} from "react-redux";
import store from "@/redux/store";
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Head>
                <title>Shopping list</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}
