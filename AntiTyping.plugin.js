/**
 * @name AntiTyping
 * @author BaskingBall1
 * @description doesn't display you typing
 * @version 1.0.0
 */

module.exports = class AntiTyping {
  start() {
    const Module = BdApi.findModuleByProps("startTyping");
    BdApi.Patcher.instead("AntiTyping", Module, "startTyping", () => {});
  }
  stop() {
    BdApi.Patcher.unpatchAll("AntiTyping");
  }
};
