'use strict';

const { deletedGuildMembers } = require('../../../structures/GuildMember');
const { Events, Status } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  if (deletedGuildMembers.has(data.id)) {
    deletedGuildMembers.delete(data.id);
  }

  const guild = client.guilds.cache.get(data.guild_id);
  if (guild) {
    guild.memberCount++;
    const member = guild.members._add(data);
    if (shard.status === Status.READY) {
      /**
       * Emitted whenever a user joins a guild.
       * @event Client#guildMemberAdd
       * @param {GuildMember} member The member that has joined a guild
       */
      client.emit(Events.GUILD_MEMBER_ADD, member);
    }
  }
};
