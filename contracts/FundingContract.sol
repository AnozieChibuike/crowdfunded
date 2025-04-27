// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CrowdFunded {
    struct Campaign {
        uint256 id;
        address creator;
        uint256 goal;          // Amount to raise
        uint256 pledged;       // Amount pledged so far
        uint256 startAt;       // Start timestamp
        uint256 endAt;         // End timestamp
        bool claimed;          // If creator has claimed funds
        string title;         // Crowd Funding Title
        string description;   // Description of Crowdfunding
    }

    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public pledgedAmount;

    event Launch(uint256 indexed id, address indexed creator, uint256 goal, uint256 startAt, uint256 endAt);
    event Pledge(uint256 indexed id, address indexed caller, uint256 amount);
    event Unpledge(uint256 indexed id, address indexed caller, uint256 amount);
    event Claim(uint256 indexed id);
    event Refund(uint256 indexed id, address indexed caller, uint256 amount);

    /// @notice Launch a new crowdfunding campaign
    function launch(uint256 _goal, uint256 _duration, string calldata _title, string calldata _description) external {
        require(_duration > 0, "Duration must be > 0");

        campaignCount += 1;
        campaigns[campaignCount] = Campaign({
            id: campaignCount,
            creator: msg.sender,
            goal: _goal,
            pledged: 0,
            startAt: block.timestamp,
            endAt: block.timestamp + _duration,
            claimed: false,
            title: _title,
            description: _description
        });

        emit Launch(campaignCount, msg.sender, _goal, block.timestamp, block.timestamp + _duration);
    }

    /// @notice Pledge ETH to a campaign
    function pledge(uint256 _id) external payable {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp >= campaign.startAt, "Campaign not started");
        require(block.timestamp <= campaign.endAt, "Campaign ended");

        campaign.pledged += msg.value;
        pledgedAmount[_id][msg.sender] += msg.value;

        emit Pledge(_id, msg.sender, msg.value);
    }

    /// @notice Withdraw your pledge before campaign ends (optional)
    function unpledge(uint256 _id, uint256 _amount) external {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp <= campaign.endAt, "Campaign ended");

        require(pledgedAmount[_id][msg.sender] >= _amount, "Not enough pledged");

        campaign.pledged -= _amount;
        pledgedAmount[_id][msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);

        emit Unpledge(_id, msg.sender, _amount);
    }

    /// @notice Creator claims the raised funds if goal is reached
    function claim(uint256 _id) external {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.creator, "Not creator");
        // Allow claim if:
        // - goal is reached, or
        // - campaign ended
        bool goalReached = campaign.pledged >= campaign.goal;
        bool timeEnded = block.timestamp > campaign.endAt;

        require(goalReached || timeEnded, "Cannot claim yet, Goal not Met or Campaign not ended");
        require(!campaign.claimed, "Already claimed");

        campaign.claimed = true;
        payable(campaign.creator).transfer(campaign.pledged);

        emit Claim(_id);
    }

    /// @notice Refund pledged money if campaign failed
    function refund(uint256 _id) external {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp > campaign.endAt, "Campaign not ended");
        require(campaign.pledged < campaign.goal, "Goal was reached");

        uint256 bal = pledgedAmount[_id][msg.sender];
        require(bal > 0, "No pledged balance");

        pledgedAmount[_id][msg.sender] = 0;
        payable(msg.sender).transfer(bal);

        emit Refund(_id, msg.sender, bal);
    }

    function getCampaign(uint256 _id) external view returns (Campaign memory) {
        return campaigns[_id];
    }

    // 2. Get all campaigns by a creator
    function getAllCampaigns(address _creator) external view returns (Campaign[] memory) {
        uint256 total = campaignCount;
        uint256 count = 0;

        // First, count how many campaigns the creator has
        for (uint256 i = 1; i <= total; i++) {
            if (campaigns[i].creator == _creator) {
                count++;
            }
        }

        // Create a fixed-size array
        Campaign[] memory result = new Campaign[](count);
        uint256 index = 0;

        // Populate the array
        for (uint256 i = 1; i <= total; i++) {
            if (campaigns[i].creator == _creator) {
                result[index] = campaigns[i];
                index++;
            }
        }

        return result;
    }
}
