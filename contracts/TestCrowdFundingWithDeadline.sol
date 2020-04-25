pragma solidity >=0.4.21 <0.7.0;
import "./CrowdFundingWithDeadline.sol";


contract TestCrowdFundingWithDeadline is CrowdFundingWithDeadline {
    uint256 time;

    constructor(
        string memory contractName,
        //uint256 targetAmountEth,
        uint256 targetAmountWei,
        uint256 durationInMin,
        address beneficiaryAddress
    )
        public
        CrowdFundingWithDeadline(
            contractName,
            //targetAmountEth,
            targetAmountWei,
            durationInMin,
            beneficiaryAddress
        )
    {}

    function currentTime() internal view returns (uint256) {
        return time;
    }

    function setCurrentTime(uint256 _time) public {
        time = _time;
    }
}
