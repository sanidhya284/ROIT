// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialMedia {
    struct Post {
        uint id;
        string content;
        address author;
    }

    Post[] public posts;
    uint public postCount;

    function createPost(string memory _content) public {
        postCount++;
        posts.push(Post(postCount, _content, msg.sender));
    }

    function getPost(uint _id) public view returns (Post memory) {
        require(_id > 0 && _id <= postCount, "Post does not exist.");
        return posts[_id - 1];
    }
}
