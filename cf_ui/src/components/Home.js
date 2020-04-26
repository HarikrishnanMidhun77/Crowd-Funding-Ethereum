import React, { Component } from "react";
import { Button, Header, Form } from "semantic-ui-react";
import { withRouter } from "react-router";

export default class Home extends Component {
  state = {
    address: "",
  };
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ address: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/campaigns/${this.state.address}`);
  }

  render() {
    return (
      <>
        <Header as="h1">Crowd Funding Application</Header>
        <Form>
          <Form.Input
            label="Contract Address"
            type="text"
            value={this.state.address}
            onChange={this.onChange}
          />
          <Button type="submit" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
      </>
    );
  }
}
