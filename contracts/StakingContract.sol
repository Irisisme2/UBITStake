// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingContract is Ownable {
    IERC20 public ubitToken;

    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    mapping(address => Stake) public stakes;
    mapping(address => uint256) public rewards;

    uint256 public rewardRate = 100; // Example reward rate

    constructor(IERC20 _ubitToken) Ownable(msg.sender) {
        ubitToken = _ubitToken;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(ubitToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        if (stakes[msg.sender].amount > 0) {
            rewards[msg.sender] += calculateReward(msg.sender);
        }

        stakes[msg.sender].amount += _amount;
        stakes[msg.sender].startTime = block.timestamp;
    }

    function unstake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(stakes[msg.sender].amount >= _amount, "Insufficient staked amount");

        rewards[msg.sender] += calculateReward(msg.sender);

        stakes[msg.sender].amount -= _amount;
        ubitToken.transfer(msg.sender, _amount);

        if (stakes[msg.sender].amount == 0) {
            stakes[msg.sender].startTime = 0;
        } else {
            stakes[msg.sender].startTime = block.timestamp;
        }
    }

    function claimReward() external {
        uint256 reward = rewards[msg.sender] + calculateReward(msg.sender);
        rewards[msg.sender] = 0;
        stakes[msg.sender].startTime = block.timestamp;

        ubitToken.transfer(msg.sender, reward);
    }

    function calculateReward(address _staker) internal view returns (uint256) {
        Stake memory stakeData = stakes[_staker];
        uint256 stakingDuration = block.timestamp - stakeData.startTime;
        return stakeData.amount * stakingDuration * rewardRate / (100 * 365 days);
    }

    function setRewardRate(uint256 _rate) external onlyOwner {
        rewardRate = _rate;
    }
}
