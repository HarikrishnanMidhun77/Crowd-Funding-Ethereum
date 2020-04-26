import React, { Component } from "react";
import {
  Button,
  Header,
  Form,
  Table,
  Tab,
  TableCell,
  TableFooter,
  TableRow,
  TableHeaderCell,
  Input,
} from "semantic-ui-react";

export default class Campaign extends Component {
  ONGOING_STATE = 0;
  FAILED_STATE = 1;
  SUCCEEDED_STATE = 2;
  PAYED_OUT_STATE = 3;

  state = {
    campaign: {
      name: "N/A",
      targetAmount: 0,
      totalCollected: 0,
      campaignFinished: false,
      deadline: new Date(0),
      isBeneficiary: false,
      state: "",
    },
    contributionAmount: "0",
  };
  constructor(props) {
    super(props);
    this.onContribute = this.onContribute.bind(this);
  }
  async componentDidMount() {
    const currentCampaign = this.getCampaign(this.getCampaignAddress());
    this.setState({ campaign: currentCampaign });
  }
  getCampaign(address) {
    return {
      name: "new Campaign",
      targetAmount: 300,
      totalCollected: 20,
      campaignFinished: false,
      deadline: new Date(),
      isBeneficiary: true,
      state: this.ONGOING_STATE,
    };
  }
  render() {
    return (
      <div>
        <Table celled padded striped color="teal">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <TableCell>Name</TableCell>
              <TableCell singleLine>{this.state.campaign.name}</TableCell>
            </Table.Row>

            <Table.Row>
              <TableCell>targetAmount</TableCell>
              <TableCell singleLine>
                {this.state.campaign.targetAmount}
              </TableCell>
            </Table.Row>

            <Table.Row>
              <TableCell>totalCollected</TableCell>
              <TableCell singleLine>
                {this.state.campaign.totalCollected}
              </TableCell>
            </Table.Row>

            <Table.Row>
              <TableCell>Has Finished</TableCell>
              <TableCell singleLine>
                {this.state.campaign.campaignFinished.toString()}
              </TableCell>
            </Table.Row>

            <Table.Row>
              <TableCell>deadline</TableCell>
              <TableCell singleLine>{this.state.campaign.deadline}</TableCell>
            </Table.Row>

            <Table.Row>
              <TableCell>I am Beneficiary</TableCell>
              <TableCell singleLine>
                {this.state.campaign.isBeneficiary}
              </TableCell>
            </Table.Row>

            <Table.Row>
              <TableCell>Contract State</TableCell>
              <TableCell singleLine>{this.state.campaign.state}</TableCell>
            </Table.Row>
          </Table.Body>

          <TableFooter fullWidth>
            <TableRow>
              <TableHeaderCell colSpan="2">
                {this.campaignInteractionSection()}
              </TableHeaderCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }

  campaignInteractionSection() {
    if (this.state.campaign.campaignFinished) {
      return this.postcampaignInterface();
    } else {
      return this.contributeInterface();
    }
  }

  postcampaignInterface() {
    if (this.state.campaign.state == this.ONGOING_STATE) {
      return (
        <div>
          <Button type="submit" positive>
            Finish campaign
          </Button>
        </div>
      );
    }
    if (
      this.state.campaign.state == this.SUCCEEDED_STATE &&
      this.state.isBeneficiary
    ) {
      return (
        <div>
          <Button type="submit" negative>
            Collect Funds
          </Button>
        </div>
      );
    }
    if (this.state.campaign.state == this.FAILED_STATE) {
      return (
        <div>
          <Button type="submit" negative>
            Refund
          </Button>
        </div>
      );
    }
  }
  contributeInterface() {
    return (
      <div>
        <Input
          action={{
            color: "real",
            content: "Contribute",
            onClick: this.onContribute,
          }}
          actionPosition="left"
          label="Eth"
          labelPosition="right"
          placeholder="1"
          onClick={(e) => {
            this.setState({ contributionAmount: e.target.value });
          }}
        />
      </div>
    );
  }
  onContribute() {
    alert(`Contributing ${this.state.contributionAmount} to a contract.`);
  }
}
