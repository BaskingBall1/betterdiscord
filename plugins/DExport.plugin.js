/**
 * @name DExport
 * @author BaskingBall1
 * @description exports friends list and guild list to json
 * @version 1.0.0
 */

module.exports = class DExport {
  start() {
    this.exportFriendsList();
    this.exportGuildsList();
  }
  stop() {}
  exportFriendsList() {
    const RelationshipStore = BdApi.findModuleByProps("getRelationships");
    const getCurrentUser = BdApi.findModuleByProps("getCurrentUser", "getUser");

    let relationships = RelationshipStore.getFriendIDs().map((id) => {
      let user = getCurrentUser.getUser(id);
      return {
        id: user.id,
        username: `${user.username}#${user.discriminator}`,
      };
    });

    BdApi.saveData("DExport", "relationships", relationships);
  }
  exportGuildsList() {
    const GuildStore = BdApi.findModuleByProps("getGuilds").getGuilds();
    let guilds = Object.keys(GuildStore).map((guild) => {
      return {
        id: GuildStore[guild].id,
        name: GuildStore[guild].name,
        vanityUrl: GuildStore[guild].vanityURLCode,
      };
    });
    BdApi.saveData("DExport", "guilds", guilds);
  }
};
