/**
 * @name UnDelete
 * @author BaskingBall1
 * @description undelete latest message
 * @version 1.0.0
 */

module.exports = class UnDelete {
  start() {
    const CommandsModule =
      BdApi.findModuleByProps("BUILT_IN_COMMANDS").BUILT_IN_COMMANDS;
    const MessageModule = BdApi.findModuleByProps("deleteMessage");
    const GetMessages = BdApi.findModuleByProps("getMessages");

    const getMessage = (channelId, messageId) => {
      return GetMessages.getMessage(channelId, messageId);
    };

    BdApi.Patcher.before(
      "UnDelete",
      MessageModule,
      "deleteMessage",
      (e, t, n) => {
        let message = getMessage(...t);
        BdApi.saveData("UnDelete", "latest_message", {
          content: message.content,
          channelId: message.channel_id,
        });
      }
    );

    CommandsModule.push({
      applicationId: "-1",
      id: String(0 - CommandsModule.length),
      type: 1,
      target: 1,
      name: "undo",
      displayName: "undo",
      displayDescription: "undelete last message",
      execute: (_, { channel }) => {
        let latestMessage = BdApi.loadData("UnDelete", "latest_message");
        MessageModule.sendMessage(latestMessage.channelId, {
          content: latestMessage.content,
          tts: false,
          invalidEmojis: [],
          validNonShortcutEmojis: [],
        });
      },
    });
  }
  stop() {
    BdApi.Patcher.unpatchAll("UnDelete");
  }
};
