import React from "react";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import { CardGrid } from "./components/CardGrid";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

const NotFound = () => <h1>Not Found</h1>;
const Paid = () => <h1>THANKS FOR YOUR PAYMENT!</h1>;

class App extends React.Component {
  render() {
    return (
      <Layout style={{ height: "auto" }}>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <img
            src={require('./images/download.jpeg')}
            alt={"shopIcon"}
            height={"64px"}
            style={{ float: "left", marginRight: "20px" }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <Link to="/">Pay in Bitcoin</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className={"App"}
          style={{ padding: "0 50px", marginTop: 84, height: "100%" }}
        >
          <Switch>
            <Route path="/" exact component={CardGrid} />
            <Route path="/paid/" component={Paid} />
            <Route component={NotFound} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Hostelio ©2022
        </Footer>
      </Layout>
    );
  }
}

export default App;
