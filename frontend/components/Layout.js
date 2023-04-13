import React, { useContext } from "react";
import App from "next/app";
import Head from "next/head";
import Link from "next/link";
import HeaderStyles from "../styles/components/Header.module.css";
import AppContext from "../context/AppContext";

const Layout = (props) => {
  const { user, setUser } = useContext(AppContext);
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
            {user ? (
              <Link href="/">
                <a
                  className="header-logo"
                  onClick={() => {
                    setUser(null);
                  }}
                >
                  ログアウト
                </a>
              </Link>
            ) : (
              <Link href="/login" className="header-logo">
                <a>ログイン</a>
              </Link>
            )}
          </li>
          <li>
            {user ? (
              <span className="header-logo">{user.username}</span>
            ) : (
              <Link href="/register" className="header-logo">
                <a>新規登録</a>
              </Link>
            )}
          </li>
        </ul>
      </header>
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
