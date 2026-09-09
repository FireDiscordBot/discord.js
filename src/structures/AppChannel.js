'use strict';

const BaseGuildTextChannel = require('./BaseGuildTextChannel');

/**
 * Represents a guild app channel on Discord.
 * @extends {BaseGuildTextChannel}
 */
class AppChannel extends BaseGuildTextChannel {
  _patch(data) {
    super._patch(data);

    if ('rate_limit_per_user' in data) {
      /**
       * The rate limit per user (slowmode) for this channel in seconds
       * @type {number}
       */
      this.rateLimitPerUser = data.rate_limit_per_user;
    }

    if ('application_id' in data) {
      /**
       * The ID of the application tied to this channel
       * @type {string}
       */
      this.applicationId = data.application_id;
    }
  }

  /**
   * Sets the rate limit per user (slowmode) for this channel.
   * @param {number} rateLimitPerUser The new rate limit in seconds
   * @param {string} [reason] Reason for changing the channel's rate limit
   * @returns {Promise<AppChannel>}
   */
  setRateLimitPerUser(rateLimitPerUser, reason) {
    return this.edit({ rateLimitPerUser }, reason);
  }
}

module.exports = AppChannel;
