/**
 * @name ChatMacro
 * @author BaskingBall1
 * @description lets you create slash commands to macro sentences
 * @version 1.0.0
 */

const settings = {
  commands: [
    { command: "test", message: "test message", description: "test desc" },
    { command: "test2", message: "test message2", description: "test desc 2" },
  ],
};

function sendMessage(module, channelId, message) {
  module.sendMessage(channelId, {
    content: message,
    tts: false,
    invalidEmojis: [],
    validNonShortcutEmojis: [],
  });
}

module.exports = class ChatMacro {
  start() {
    const CommandsModule =
      BdApi.findModuleByProps("BUILT_IN_COMMANDS").BUILT_IN_COMMANDS;
    const MessageModule = BdApi.findModuleByProps("sendMessage");

    let commands = settings.commands;

    commands.forEach((element) => {
      CommandsModule.push({
        applicationId: "-1",
        id: String(0 - CommandsModule.length),
        type: 1,
        target: 1,
        name: element.command,
        displayName: element.command,
        displayDescription: element.description,
        execute: (_, { channel }) => {
          sendMessage(MessageModule, channel.id, element.message);
        },
      });
    });
  }
  stop() {}
};
