// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialMedia {
    uint256 public postCount = 0;

    struct Post {
        uint256 id;
        string content;
        address author;
        uint256 timestamp;
    }

    mapping(uint256 => Post) private posts;

    event PostCreated(uint256 id, string content, address author, uint256 timestamp);

    // Create a new post
    function createPost(string memory _content) public {
        postCount++;
        posts[postCount] = Post(postCount, _content, msg.sender, block.timestamp);
        emit PostCreated(postCount, _content, msg.sender, block.timestamp);
    }

    // Retrieve a single post by ID
    function getPost(uint256 _id) public view returns (Post memory) {
        require(_id > 0 && _id <= postCount, "Post does not exist");
        return posts[_id];
    }

    // Retrieve all posts
    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory _posts = new Post[](postCount);
        for (uint256 i = 1; i <= postCount; i++) {
            _posts[i - 1] = posts[i];
        }
        return _posts;
    }
}
