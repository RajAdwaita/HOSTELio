import React from "react";
import { Input, Checkbox, Button, message } from "antd";

export class PaymentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      confirm: false
    };
  }

  handleInput = e => {
    this.setState({ email: e.target.value });
  };

  handleCheckbox = e => {
    this.setState({ confirm: e.target.checked });
  };

  render() {
    const disabled =
      this.state.email !== "" &&
      this.state.confirm &&
      this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        ? false
        : true;

    return (
      <div style={{ padding: "15px" }}>
        <form action="https://btcpayjungle.com/apps/fCou9amxQEvthJPKEnUJtyEvdes/pos">
          <Input
            placeholder="Please input your email"
            style={{ marginBottom: "10px" }}
            onChange={this.handleInput}
            onBlur={() =>
              !this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                ? message.warning("Email is not valid")
                : null
            }
          />
          <Checkbox
            style={{ marginBottom: "10px" }}
            onChange={this.handleCheckbox}
          >
            I Accept the Terms and Conditions
          </Checkbox>
          <Button
            disabled={disabled}
            style={{ width: "150px" }}
            value={this.props.coin}
            htmlType="submit"
            name="choiceKey"
          >
            {`Pay ( ₹${this.props.price} )`}
          </Button>
        </form>
      </div>
    );
  }
}
