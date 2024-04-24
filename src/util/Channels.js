'use strict';

const { ChannelType } = require('discord-api-types/v10');
const Structures = require('./Structures');

/**
 * Creates a discord.js channel from data received from the API.
 * @param {Client} client The client
 * @param {APIChannel} data The data of the channel to create
 * @param {Guild} [guild] The guild where this channel belongs
 * @param {Object} [extras] Extra information to supply for creating this channel
 * @returns {Channel} Any kind of channel.
 * @ignore
 */
function createChannel(client, data, guild, { allowUnknownGuild, fromInteraction } = {}) {
  let channel;
  if (!data.guild_id && !guild) {
    if ((data.recipients && data.type !== ChannelType.GroupDM) || data.type === ChannelType.DM) {
      channel = new (Structures.get('DMChannel'))(client, data);
    } else if (data.type === ChannelType.GroupDM) {
      channel = new (Structures.get('PartialGroupDMChannel'))(client, data);
    }
  } else {
    guild ??= client.guilds.cache.get(data.guild_id);

    if (guild || allowUnknownGuild) {
      switch (data.type) {
        case ChannelType.GuildText: {
          channel = new (Structures.get('TextChannel'))(guild, data, client);
          break;
        }
        case ChannelType.GuildVoice: {
          channel = new (Structures.get('VoiceChannel'))(guild, data, client);
          break;
        }
        case ChannelType.GuildCategory: {
          channel = new (Structures.get('CategoryChannel'))(guild, data, client);
          break;
        }
        case ChannelType.GuildAnnouncement: {
          channel = new (Structures.get('NewsChannel'))(guild, data, client);
          break;
        }
        case ChannelType.GuildStageVoice: {
          channel = new (Structures.get('StageChannel'))(guild, data, client);
          break;
        }
        case ChannelType.AnnouncementThread:
        case ChannelType.PublicThread:
        case ChannelType.PrivateThread: {
          channel = new (Structures.get('ThreadChannel'))(guild, data, client, fromInteraction);
          if (!allowUnknownGuild) channel.parent?.threads.cache.set(channel.id, channel);
          break;
        }
        case ChannelType.GuildDirectory:
          channel = new (Structures.get('DirectoryChannel'))(guild, data, client);
          break;
        case ChannelType.GuildForum:
          channel = new (Structures.get('ForumChannel'))(guild, data, client);
          break;
      }
      if (channel && !allowUnknownGuild) guild.channels?.cache.set(channel.id, channel);
    }
  }
  return channel;
}

/**
 * Transforms an API guild forum tag to camel-cased guild forum tag.
 * @param {APIGuildForumTag} tag The tag to transform
 * @returns {GuildForumTag}
 * @ignore
 */
function transformAPIGuildForumTag(tag) {
  return {
    id: tag.id,
    name: tag.name,
    moderated: tag.moderated,
    emoji:
      tag.emoji_id ?? tag.emoji_name
        ? {
            id: tag.emoji_id,
            name: tag.emoji_name,
          }
        : null,
  };
}

/**
 * Transforms a camel-cased guild forum tag to an API guild forum tag.
 * @param {GuildForumTag} tag The tag to transform
 * @returns {APIGuildForumTag}
 * @ignore
 */
function transformGuildForumTag(tag) {
  return {
    id: tag.id,
    name: tag.name,
    moderated: tag.moderated,
    emoji_id: tag.emoji?.id ?? null,
    emoji_name: tag.emoji?.name ?? null,
  };
}

/**
 * Transforms an API guild forum default reaction object to a
 * camel-cased guild forum default reaction object.
 * @param {APIGuildForumDefaultReactionEmoji} defaultReaction The default reaction to transform
 * @returns {DefaultReactionEmoji}
 * @ignore
 */
function transformAPIGuildDefaultReaction(defaultReaction) {
  return {
    id: defaultReaction.emoji_id,
    name: defaultReaction.emoji_name,
  };
}

/**
 * Transforms a camel-cased guild forum default reaction object to an
 * API guild forum default reaction object.
 * @param {DefaultReactionEmoji} defaultReaction The default reaction to transform
 * @returns {APIGuildForumDefaultReactionEmoji}
 * @ignore
 */
function transformGuildDefaultReaction(defaultReaction) {
  return {
    emoji_id: defaultReaction.id,
    emoji_name: defaultReaction.name,
  };
}

module.exports = {
  createChannel,
  transformAPIGuildForumTag,
  transformGuildForumTag,
  transformAPIGuildDefaultReaction,
  transformGuildDefaultReaction,
};
