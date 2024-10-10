const SocialMedia = artifacts.require("SocialMedia");

contract('SocialMedia', (accounts) => {
  let socialMedia;

  before(async () => {
    socialMedia = await SocialMedia.deployed();
  });

  it('should create a post', async () => {
    await socialMedia.createPost("Hello Blockchain", { from: accounts[0] });
    const post = await socialMedia.getPost(1);
    assert.equal(post.content, "Hello Blockchain", "Post content should match");
  });

  it('should have the correct post author', async () => {
    const post = await socialMedia.getPost(1);
    assert.equal(post.author, accounts[0], "Post author should match");
  });
});
