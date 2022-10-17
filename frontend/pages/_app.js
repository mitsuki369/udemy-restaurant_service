import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import '../styles/Common.css';
import withData from "../lib/apollo";

//MyApp:すべてのコンポーネントを指す
class MyApp extends App {
    render(){
        const { Component, pageProps } = this.props;
        return (
            <div>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
                    />
                </Head>

                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        );
    }
}

export default withData(MyApp);