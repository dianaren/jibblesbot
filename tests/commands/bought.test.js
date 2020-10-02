const bought = require('../commands/bought');

const mockSend = jest.fn();
const mockSetTopic = jest.fn(() => Promise.resolve({
  then: (fn) => fn()
}));

describe('bought skis', () => {
  const args = ['skis'];
  const dummyMessage = {
    channel: {
      send: mockSend,
      setTopic: mockSetTopic
    },
    author: {
      username: ''
    }
  };
  beforeEach(() => {
    mockSend.mockClear();
    mockSetTopic.mockClear();
    bought.execute(dummyMessage, args);
  });
  test('it sets the topic once', async () => {
    expect(dummyMessage.channel.setTopic).toHaveBeenCalledTimes(1);
  });
  test('it sends a message once', async () => {
    expect(dummyMessage.channel.send).toHaveBeenCalledTimes(1);
  });
});
