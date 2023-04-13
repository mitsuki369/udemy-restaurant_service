import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/Common.css";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";
import Cookies from "js-cookie";

//MyApp:すべてのコンポーネントを指す
class MyApp extends App {
  state = {
    user: null,
    cart: { items: [], total: 0 },
  };

  setUser = (user) => {
    this.setState({ user });
  };

  //すでにユーザーのクッキー情報が残っているかを確認する
  componentDidMount() {
    const token = Cookies.get("token"); //tokenの中にjwtが入ってる
    const cart = Cookies.get("cart");

    if (cart !== "undefined" && typeof cart === "string") {
      JSON.parse(cart).forEach((item) => {
        this.setState({
          cart: {
            items: JSON.parse(cart),
            total: (this.state.cart.total += item.price * item.quantity),
          },
        });
      });
    }

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          Cookies.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        console.log(this.state.user);
        this.setUser(user); //ログインと同等
        console.log(this.state.user);
      });
    }
  }

  //カートへ商品の追加
  addItem = (item) => {
    let { items } = this.state.cart; //現在のカートの状態を保持
    const newItem = items.find((i) => i.id === item.id);
    if (!newItem) {
      item.quantity = 1;
      //cartに追加する
      this.setState(
        {
          cart: {
            items: [...items, item], //今まで入ってたカート内の商品に対して新しく商品を追加する意味
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    } else {
      //すでに同じ商品がカートに入っているとき
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  //カートへ商品の削除
  removeItem = (item) => {
    let { items } = this.state.cart; //現在のカートの状態を保持
    const newItem = items.find((i) => i.id === item.id);
    if (newItem.quantity > 1) {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity - 1 })
                : item
            ),
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    } else {
      //カートに入っている商品が1つの場合
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1); //カートの中からindexを一つだけ削除する

      this.setState(
        {
          cart: {
            items: items,
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          cart: this.state.cart,
          setUser: this.setUser,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <div>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
            />
          </Head>

          <Layout>
            {/* 今作っているすべてのコンポーネントを表す */}
            <Component {...pageProps} />
          </Layout>
        </div>
      </AppContext.Provider>
    );
  }
}

export default withData(MyApp);
