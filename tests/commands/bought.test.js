const bought = require('../../commands/bought');

const mockSend = jest.fn();
const mockSetTopic = jest.fn(() => Promise.resolve({
  then: (fn) => fn()
}));
const mockReply = jest.fn();

const dummyMessage = {
  channel: {
    send: mockSend,
    setTopic: mockSetTopic
  },
  author: {
    username: ''
  },
  reply: mockReply
};

describe('bought skis', () => {
  const args = ['skis'];
  beforeEach(() => {
    mockSend.mockClear();
    mockSetTopic.mockClear();
    mockReply.mockClear();
    bought.execute(dummyMessage, args);
  });
  test('it sets the topic once', async () => {
    expect(dummyMessage.channel.setTopic).toHaveBeenCalledTimes(1);
  });
  test('it sends a message once', async () => {
    expect(dummyMessage.channel.send).toHaveBeenCalledTimes(1);
  });
});

describe('bought gear', () => {
  const args = ['gear'];
  beforeEach(() => {
    mockSend.mockClear();
    mockSetTopic.mockClear();
    mockReply.mockClear();
    bought.execute(dummyMessage, args);
  });
  test('it sets the topic once', async () => {
    expect(dummyMessage.channel.setTopic).toHaveBeenCalledTimes(1);
  });
  test('it sends a message once', async () => {
    expect(dummyMessage.channel.send).toHaveBeenCalledTimes(1);
  });
});

describe('bought dildo', () => {
  const args = ['dildo'];
  beforeEach(() => {
    mockSend.mockClear();
    mockSetTopic.mockClear();
    mockReply.mockClear();
    bought.execute(dummyMessage, args);
  });
  test('it does not set the topic', async () => {
    expect(dummyMessage.channel.setTopic).not.toHaveBeenCalled();
  });
  test('it sends a reply once', async () => {
    expect(dummyMessage.reply).toHaveBeenCalledTimes(1);
  });
});
