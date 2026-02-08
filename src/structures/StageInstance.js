'use strict';

const Base = require('./Base');
const { PrivacyLevels } = require('../util/Constants');
const LimitedCollection = require('../util/LimitedCollection');
const SnowflakeUtil = require('../util/SnowflakeUtil');

/**
 * @type {Map<Snowflake, number>}
 * @private
 * @internal
 */
const deletedStageInstances = new LimitedCollection({
  sweepFilter: () => (_, deleted) => Date.now() - deleted >= 300_000,
  sweepInterval: 60,
});

/**
 * Represents a stage instance.
 * @extends {Base}
 */
class StageInstance extends Base {
  constructor(client, data) {
    super(client);

    /**
     * The stage instance's id
     * @type {Snowflake}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('guild_id' in data) {
      /**
       * The id of the guild associated with the stage channel
       * @type {Snowflake}
       */
      this.guildId = data.guild_id;
    }

    if ('channel_id' in data) {
      /**
       * The id of the channel associated with the stage channel
       * @type {Snowflake}
       */
      this.channelId = data.channel_id;
    }

    if ('topic' in data) {
      /**
       * The topic of the stage instance
       * @type {string}
       */
      this.topic = data.topic;
    }

    if ('privacy_level' in data) {
      /**
       * The privacy level of the stage instance
       * @type {PrivacyLevel}
       */
      this.privacyLevel = PrivacyLevels[data.privacy_level];
    }

    if ('discoverable_disabled' in data) {
      /**
       * Whether or not stage discovery is disabled
       * @type {?boolean}
       */
      this.discoverableDisabled = data.discoverable_disabled;
    } else {
      this.discoverableDisabled ??= null;
    }

    if ('guild_scheduled_event_id' in data) {
      /**
       * The associated guild scheduled event id of this stage instance
       * @type {?Snowflake}
       */
      this.guildScheduledEventId = data.guild_scheduled_event_id;
    } else {
      this.guildScheduledEventId ??= null;
    }
  }

  /**
   * The stage channel associated with this stage instance
   * @type {?StageChannel}
   * @readonly
   */
  get channel() {
    return this.client.channels.resolve(this.channelId);
  }

  /**
   * The associated guild scheduled event of this stage instance
   * @type {?GuildScheduledEvent}
   * @readonly
   */
  get guildScheduledEvent() {
    return this.guild?.scheduledEvents.resolve(this.guildScheduledEventId) ?? null;
  }

  /**
   * Whether or not the structure has been deleted
   * @type {boolean}
   * @readonly
   */
  get deleted() {
    return deletedStageInstances.has(this.id);
  }

  /**
   * Approximately when the structure has been deleted
   * @type {number?}
   * @readonly
   */
  get deletedTimestamp() {
    return deletedStageInstances.get(this.id);
  }

  /**
   * Approximately when the structure has been deleted
   * @type {Date}
   * @readonly
   */
  get deletedAt() {
    return this.deleted && new Date(deletedStageInstances.get(this.id));
  }

  set deleted(value) {
    if (value) deletedStageInstances.set(this.id, Date.now());
    else deletedStageInstances.delete(this.id);
  }

  /**
   * The guild this stage instance belongs to
   * @type {?Guild}
   * @readonly
   */
  get guild() {
    return this.client.guilds.resolve(this.guildId);
  }

  /**
   * Edits this stage instance.
   * @param {StageInstanceEditOptions} options The options to edit the stage instance
   * @returns {Promise<StageInstance>}
   * @example
   * // Edit a stage instance
   * stageInstance.edit({ topic: 'new topic' })
   *  .then(stageInstance => console.log(stageInstance))
   *  .catch(console.error)
   */
  edit(options) {
    return this.guild.stageInstances.edit(this.channelId, options);
  }

  /**
   * Deletes this stage instance.
   * @returns {Promise<StageInstance>}
   * @example
   * // Delete a stage instance
   * stageInstance.delete()
   *  .then(stageInstance => console.log(stageInstance))
   *  .catch(console.error);
   */
  async delete() {
    await this.guild.stageInstances.delete(this.channelId);
    const clone = this._clone();
    deletedStageInstances.set(clone.id, Date.now());
    return clone;
  }

  /**
   * Sets the topic of this stage instance.
   * @param {string} topic The topic for the stage instance
   * @returns {Promise<StageInstance>}
   * @example
   * // Set topic of a stage instance
   * stageInstance.setTopic('new topic')
   *  .then(stageInstance => console.log(`Set the topic to: ${stageInstance.topic}`))
   *  .catch(console.error);
   */
  setTopic(topic) {
    return this.guild.stageInstances.edit(this.channelId, { topic });
  }

  /**
   * The timestamp this stage instances was created at
   * @type {number}
   * @readonly
   */
  get createdTimestamp() {
    return SnowflakeUtil.timestampFrom(this.id);
  }

  /**
   * The time this stage instance was created at
   * @type {Date}
   * @readonly
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }
}

exports.StageInstance = StageInstance;
exports.deletedStageInstances = deletedStageInstances;
