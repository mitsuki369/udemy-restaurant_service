import {
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Row,
  Col,
  Button,
} from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import AppContext from "../context/AppContext";
import { useContext } from "react";

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

const Restaurants = (props) => {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id }, //queryは「?id」から
  });

  if (error) return "レストランの読み込みに失敗しました";

  if (loading) return <h1>Loading...</h1>;

  if (data) {
    const { restaurant } = data;
    return (
      <div className="container-fluid">
        <h1>{restaurant.name}</h1>
        <Row>
          {restaurant.dishes.map((dish) => (
            <Col xs="6" sm="4" key={dish.id} style={{ padding: 0 }}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  // src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                  top={true}
                  style={{ height: 250 }}
                />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardTitle>{dish.description}</CardTitle>
                  <CardTitle>¥{dish.price}</CardTitle>
                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(dish)}
                  >
                    + カートに入れる
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
          <style jsx>
            {`
              a {
                color: #ffffff;
              }
              a:link {
                text-decoration: none;
                color: #ffffff;
              }
              a:hover {
                color: #ffffff;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart />
            </div>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default Restaurants;
