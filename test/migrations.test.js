const Migrations = artifacts.require("Migrations");

contract("Migrations", (accounts) => {
  it("should deploy successfully", async () => {
    const instance = await Migrations.deployed();
    assert(instance.address !== "");
  });

  it("should have an owner", async () => {
    const instance = await Migrations.deployed();
    const owner = await instance.owner();
    assert(owner !== "");
  });
});
