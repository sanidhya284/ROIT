// Add this to SocialMedia.sol

pragma solidity ^0.8.0;

contract SocialMedia {
    uint256 public postCount = 0;

    struct Post {
        uint256 id;
        string content;
        address author;
        uint256 timestamp;
    }

    mapping(uint256 => Post) public posts;

    event PostCreated(uint256 id, string content, address author, uint256 timestamp);

    function createPost(string memory _content) public {
        postCount++;
        posts[postCount] = Post(postCount, _content, msg.sender, block.timestamp);
        emit PostCreated(postCount, _content, msg.sender, block.timestamp);
    }

    function getPost(uint256 _id) public view returns (string memory, address, uint256) {
        Post memory post = posts[_id];
        return (post.content, post.author, post.timestamp);
    }

    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory _posts = new Post[](postCount);
        for (uint256 i = 1; i <= postCount; i++) {
            Post storage post = posts[i];
            _posts[i - 1] = post;
        }
        return _posts;
    }
}
