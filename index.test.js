import { sendMessageToAllDevices, sendMessageToDevice, sendMessageToTopic } from "."

describe("Send message to device", () => {
  it("should send a message to a device", () => {
    const deviceToken = "deviceToken"
    const data = {
      'title': "title",
      'body': "body"
    }
    const result = sendMessageToDevice(deviceToken, data)
    expect(result).toBe("Send message ")
  })
})

describe("Send message to all devices", () => {
  it("should send a message to all devices", () => {
    const tokensDevices = ["deviceToken1", "deviceToken2"]
    const data = {
      'title': "title",
      'body': "body"
    }
    const result = sendMessageToAllDevices(tokensDevices, data)
    expect(result).toBe("Send all messages ")
  })
})

describe("Send message to topic", () => {
  it("should send a message to a topic", () => {
    const topic = "topic"
    const data = {
      'title': "title",
      'body': "body"
    }
    const result = sendMessageToTopic(topic, data)
    expect(result).toBe("Send message to topic")
  })
})

