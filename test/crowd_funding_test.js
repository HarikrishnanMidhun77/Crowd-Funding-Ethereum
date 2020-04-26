let CrowdFundingWithDeadline = artifacts.require(
  "../contracts/TestCrowdFundingWithDeadline.sol"
);
const BigNumber = require("bignumber.js");

contract("CrowdFundingDeadline", function (accounts) {
  let contract;
  let contractCreator = accounts[0];
  let beneficiary = accounts[1];

  const ONE_M_WEI = 1000000;
  const ONGOING_STATE = 0;
  const FAILED_STATE = 1;
  const SUCCEEDED_STATE = 2;
  const PAYED_OUT_STATE = 3;
  const ERROR_MSG =
    "Returned error: VM Exception while processing transaction: revert";

  beforeEach(async function () {
    contract = await CrowdFundingWithDeadline.new(
      "funding",
      100000,
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
    expect(state.toNumber()).to.equal(ONGOING_STATE);
  });

  it("funds are contributed", async function () {
    await contract.contribute({ value: ONE_M_WEI, from: contractCreator });
    let contributed = await contract.amounts.call(contractCreator);
    expect(contributed.toNumber()).to.equal(ONE_M_WEI);

    let totalCollected = await contract.totalCollected.call();
    expect(totalCollected.toNumber()).to.equal(ONE_M_WEI);
  });

  it("cannot contribute after deadline", async function () {
    try {
      await contract.setCurrentTime(50);
      await contract.sendTransaction({
        value: ONE_M_WEI,
        from: contractCreator,
      });
      expect.fail();
    } catch (err) {
      expect(err.message).to.equal(ERROR_MSG);
    }
  });

  it("crowd funding succeeded", async function () {
    await contract.contribute({ value: ONE_M_WEI, from: contractCreator });
    await contract.setCurrentTime(601);
    await contract.finishCrowdFunding();

    let state = await contract.state.call();
    expect(state.toNumber()).to.equal(SUCCEEDED_STATE);
  });

  it("crowd funding failed", async function () {
    await contract.setCurrentTime(601);
    await contract.finishCrowdFunding();

    let state = await contract.state.call();
    expect(state.toNumber()).to.equal(FAILED_STATE);
  });

  it("collected money payout", async function () {
    await contract.contribute({ value: ONE_M_WEI, from: contractCreator });
    await contract.setCurrentTime(601);
    await contract.finishCrowdFunding();
    // let totalCollected = await contract.totalCollected.call();
    // expect(totalCollected.toNumber()).to.equal(ONE_M_WEI);

    let initBalance = await web3.eth.getBalance(beneficiary);
    await contract.collect();
    let state = await contract.state.call();
    expect(state.toNumber()).to.equal(PAYED_OUT_STATE);

    let new_balance = await web3.eth.getBalance(beneficiary);
    expect(new_balance - initBalance).to.equal(ONE_M_WEI);
  });

  it("withdraw funds from contact", async function () {
    await contract.contribute({
      value: 100,
      from: contractCreator,
    });
    await contract.setCurrentTime(601);
    await contract.finishCrowdFunding();

    let initBalance = await web3.eth.getBalance(contractCreator);
    await contract.withdraw({ from: contractCreator });
    let balance = await contract.amounts.call(contractCreator);
    expect(balance.toNumber()).to.equal(0);

    // let new_balance = await web3.eth.getBalance(contractCreator);
    // expect(new_balance - initBalance).to.equal(ONE_M_WEI - 1000);
  });
});
