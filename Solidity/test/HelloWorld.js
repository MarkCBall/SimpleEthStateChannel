var HelloWorld = artifacts.require("./HelloWorld.sol");

contract('HelloWorld', (accounts) => {

  it("has a default value", async () => {
    let instance = await HelloWorld.deployed()
    let _message = await instance.message()
    assert.equal(_message, "hello world")
  });

  it("should update the value of message", async () => {
    let instance = await HelloWorld.deployed()
    await instance.updateMessage("new message")
    let _message = await instance.message()
    assert.equal(_message, "new message")
  });

  it("should let the owner update message", async () => {
    let instance = await HelloWorld.deployed();
    await instance.updateMessage("newer message", {from: accounts[0]} );
    let newMessage = await instance.message();
    assert.equal(newMessage, "newer message");
  });

  it("should NOT let the owner update message", async () => {
    let instance = await HelloWorld.deployed();
    try {
      await instance.updateMessage("newest message", {from: accounts[1]} );
      assert.fail()
    }
    catch {
      let newMessage = await instance.message();
      assert.equal(newMessage, "newer message");
    }
  });
});
