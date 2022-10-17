import React from "react";
import App from "next/app";
import Head from "next/head";
import Link from "next/link";
import HeaderStyles from '../styles/components/Header.module.css';

const Layout = (props) => {
    return (
        <div>
            <Head>
                <title>フードデリバリーサービス</title>
            </Head>
            <header className={HeaderStyles.header}>
                <ul className={HeaderStyles.headerList}>
                    <li>
                        <Link href="/" className="header-logo">
                            <a>HOME</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" className="header-logo">
                            <a>ログイン</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" className="header-logo">
                            <a>登録</a>
                        </Link>
                    </li>
                </ul>
            </header>
            <div>{props.children}</div>
        </div>
    );
};

export default Layout;