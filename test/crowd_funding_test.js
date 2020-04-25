let CrowdFundingWithDeadline = artifacts.require(
  "../contracts/TestCrowdFundingWithDeadline.sol"
);
const BigNumber = require("bignumber.js");

contract("CrowdFundingDeadline", function (accounts) {
  let contract;
  let contractCreator = accounts[0];
  let beneficiary = accounts[1];

  const ONE_M_WEI = 1000000;
  const ONGOING_STATE = "0";
  const FAILED_STATE = "1";
  const SUCCEEDED_STATE = "2";
  const PAYED_OUT_STATE = "3";

  beforeEach(async function () {
    contract = await CrowdFundingWithDeadline.new(
      "funding",
      1,
      10,
      beneficiary,
      {
        from: contractCreator,
        gas: 2000000,
      }
    );
    // console.log("contract", contract);
  });
  it("contract is initialised", async function () {
    let campaignName = await contract.name.call();
    expect(campaignName).to.equal("funding");

    // let targetAmount = await contract.targetAmount.call();
    // // expect(new BigNumber(targetAmount)).to.equal(new BigNumber(ONE_ETH));
    // expect(targetAmount.toNumber()).to.equal(ONE_M_WEI);

    let beneficiaryAddress = await contract.beneficiary.call();
    expect(beneficiaryAddress).to.equal(accounts[1]);

    let fundingDeadline = await contract.fundingDeadline.call();
    expect(fundingDeadline.toNumber()).to.equal(600);

    let state = await contract.state.call();
    expect(state.toNumber().toString()).to.equal(ONGOING_STATE);
  });

  it("funds are contributed", async function () {
    await contract.contribute({ value: ONE_M_WEI, from: contractCreator });
    let contributed = await contract.amounts.call(contractCreator);
    expect(contributed.toNumber()).to.equal(ONE_M_WEI);

    let totalCollected = await contract.totalCollected.call();
    expect(totalCollected.toNumber()).to.equal(ONE_M_WEI);
  });
});
