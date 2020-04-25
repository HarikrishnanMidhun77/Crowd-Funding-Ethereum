pragma solidity >=0.4.21 <0.7.0;


contract CrowdFundingWithDeadline {
    enum State {Ongoing, Failed, Succeeded, Paidout}

    string public name;
    uint256 public targetAmount;
    uint256 public fundingDeadline;
    address public beneficiary;
    State public state;
    mapping(address => uint256) public amounts;
    bool public collected;
    uint256 public totalCollected;

    modifier inState(State expectedState) {
        require(state == expectedState, "Invalid State");
        _;
    }

    constructor(
        string memory contractName,
        uint256 targetAmountEth,
        uint256 durationInMin,
        address beneficiaryAddress
    ) public {
        name = contractName;
        targetAmount = targetAmountEth * 1 ether;
        fundingDeadline = currentTime() + durationInMin * 1 minutes;
        beneficiary = beneficiaryAddress;
        state = State.Ongoing;
    }

    function contribute() public payable inState(State.Ongoing) {
        totalCollected += msg.value;
        amounts[msg.sender] += msg.value;

        if (totalCollected >= targetAmount) {
            collected = true;
        }
    }

    function currentTime() internal view returns (uint256) {
        return now;
    }
}
