// contracts/PostContract.sol
pragma solidity ^0.8.0;

contract PostContract {
    struct Post {
        uint id;
        string content;
        address author;
    }

    mapping(uint => Post) public posts;
    uint public postCount;
    address public owner;

    event PostCreated(uint id, string content, address author);

    constructor() {
        owner = msg.sender;
    }

    function createPost(string memory _content) public {
        postCount++;
        posts[postCount] = Post(postCount, _content, msg.sender);
        emit PostCreated(postCount, _content, msg.sender);
    }

    function getPost(uint _id) public view returns (uint, string memory, address) {
        Post memory post = posts[_id];
        return (post.id, post.content, post.author);
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Function to transfer Ether from the contract to a specified address
    function transferEther(address payable recipient, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can transfer Ether");
        require(address(this).balance >= amount, "Insufficient balance in contract");
        recipient.transfer(amount);
    }
}