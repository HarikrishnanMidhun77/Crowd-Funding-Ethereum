pragma solidity >=0.4.21 <0.7.0;


library Utils {
    function etherToWei(uint256 sumInEth) public pure returns (uint256) {
        return (sumInEth * 1 ether);
    }

    function minutuesToSeconds(uint256 mins) public pure returns (uint256) {
        return (mins * 1 minutes);
    }
}
