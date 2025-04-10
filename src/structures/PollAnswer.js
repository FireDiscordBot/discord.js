'use strict';

const { Collection } = require('@discordjs/collection');
const Base = require('./Base');
const { Emoji } = require('./Emoji');

/**
 * Represents an answer to a {@link Poll}
 * @extends {Base}
 */
class PollAnswer extends Base {
  constructor(client, data, poll) {
    super(client);

    /**
     * The {@link Poll} this answer is part of
     * @name PollAnswer#poll
     * @type {Poll}
     * @readonly
     */
    Object.defineProperty(this, 'poll', { value: poll });

    /**
     * The id of this answer
     * @type {number}
     */
    this.id = data.answer_id;

    /**
     * The text of this answer
     * @type {?string}
     */
    this.text = data.poll_media.text ?? null;

    /**
     * The raw emoji of this answer
     * @name PollAnswer#_emoji
     * @type {?APIPartialEmoji}
     * @private
     */
    Object.defineProperty(this, '_emoji', { value: data.poll_media.emoji ?? null });

    this._patch(data);
  }

  _patch(data) {
    // This `count` field comes from `poll.results.answer_counts`
    if ('count' in data) {
      /**
       * The amount of votes this answer has
       * @type {number}
       */
      this.voteCount = data.count;
    } else {
      this.voteCount ??= 0;
    }
  }

  /**
   * The emoji of this answer
   * @type {?(GuildEmoji|Emoji)}
   */
  get emoji() {
    if (!this._emoji || (!this._emoji.id && !this._emoji.name)) return null;
    return this.client.emojis.resolve(this._emoji.id) ?? new Emoji(this.client, this._emoji);
  }

  /**
   * @typedef {Object} FetchPollVotersOptions
   * @property {number} [limit] The maximum number of voters to fetch
   * @property {Snowflake} [after] The user id to fetch voters after
   */

  /**
   * Fetches the users that voted for this answer
   * @param {FetchPollVotersOptions} [options={}] The options for fetching voters
   * @returns {Promise<Collection<Snowflake, User>>}
   */
  async fetchVoters({ after, limit } = {}) {
    const { message } = this.poll;

    // eslint-disable-next-line newline-per-chained-call
    const voters = await this.client.api.channels(message.channel.id).polls(message.id).answers(this.id).get({
      query: { limit, after },
    });

    return voters.users.reduce((acc, user) => acc.set(user.id, this.client.users._add(user, false)), new Collection());
  }
}

exports.PollAnswer = PollAnswer;
