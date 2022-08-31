/**
 * @name StatusAnimation
 * @author BaskingBall1
 * @description animates status
 * @version 1.0.0
 */
const settings = {
  delay: 60000,
  options: ["option1", "option2", "option3"],
};
module.exports = class StatusAnimation {
  start() {
    const CustomStatusModule = BdApi.findModuleByProps("CustomStatusSetting");
    this.statusTimer = setTimeout(() => {
      let newStatus =
        settings.options[Math.floor(Math.random() * settings.options.length)];
      CustomStatusModule.CustomStatusSetting.updateSetting({
        emojiId: "0",
        emojiName: "",
        expiresAtMs: "0",
        text: newStatus,
      });
    }, settings.delay);
  }
  stop() {
    clearTimeout(this.statusTimer);
  }
};
