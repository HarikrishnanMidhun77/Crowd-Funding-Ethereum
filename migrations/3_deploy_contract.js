let CrowdFundingWithDeadline = artifacts.require(
  "./CrowdFundingWithDeadline.sol"
);
module.exports = async function (deployer) {
  deployer.deploy(
    CrowdFundingWithDeadline,
    "Test Campaign",
    3000000,
    200,
    "0x125b76357724c85ee0CFfc7E2Bd4C01213490937"
  );
};
