import { Card, CardTitle, CardBody, Button, Badge } from "reactstrap";
import Link from "next/dist/client/link";
import AppContext from "../../context/AppContext";
import { useContext } from "react";

const Cart = () => {
  const appContext = useContext(AppContext);

  const { cart } = appContext;

  return (
    <div>
      <Card style={{ padding: "10px 5px" }}>
        <CardTitle
          style={{
            margin: 10,
            textAlign: "center",
            fontWeight: 600,
            fontSize: 25,
          }}
        >
          注文一覧
        </CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBOttom: 5 }}>
            <small>料理：</small>
          </div>
          <div>
            {cart.items
              ? cart.items.map((item) => {
                  if (item.quantity > 0) {
                    return (
                      <div
                        className="items-one"
                        style={{ marginBottom: 15 }}
                        key={item.id}
                      >
                        <div>
                          <span id="item-price">&nbsp; {item.price}円</span>
                          <span id="item-name">&nbsp; {item.name}</span>
                        </div>
                        <div>
                          <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 5,
                              marginLeft: 10,
                            }}
                            color="link"
                            onClick={() => appContext.addItem(item)}
                          >
                            +
                          </Button>
                          <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 5,
                              marginLeft: 10,
                            }}
                            color="link"
                            onClick={() => appContext.removeItem(item)}
                          >
                            -
                          </Button>
                          <span id="item-quantity" style={{ marginLeft: 5 }}>
                            {item.quantity}つ
                          </span>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
            <div>
              <Badge style={{ width: 200, padding: 10 }} color="light">
                <p style={{ fontWeight: 100, color: "gray" }}>合計：</p>
                <p style={{ fontWeight: 600, color: "black", fontSize: 20 }}>
                  {cart.total}円
                </p>
              </Badge>
              <div>
                {cart.total !== 0 ? (
                  <Link href="/checkout">
                    <Button color="primary">
                      <a>注文する</a>
                    </Button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cart;
