'use strict';

const Base = require('./Base');
const { EntitlementTypes } = require('../util/Constants');

/**
 * Represents an entitlement.
 * @extends {Base}
 */
class Entitlement extends Base {
  constructor(client, data) {
    super(client);

    /**
     * The entitlement's id
     * @type {Snowflake}
     */
    this.id = data.id;

    if (data) this._patch(data);
  }

  _patch(data) {
    /**
     * The id of the SKU this entitlement is for
     * @type {Snowflake}
     */
    this.skuId = data.sku_id;

    /**
     * The id of the application this entitlement is for
     * @type {Snowflake}
     */
    this.applicationId = data.application_id;

    /**
     * The id of the user that owns this entitlement
     * @type {?Snowflake}
     */
    this.userId = data.user_id ?? null;

    /**
     * The id of the promotion that granted this entitlement
     * @type {?Snowflake}
     */
    this.promotionId = data.promotion_id ?? null;

    /**
     * The type of entitlement
     * @type {EntitlementType}
     */
    this.type = EntitlementTypes[data.type];

    /**
     * Whether this entitlement has been deleted
     * @type {boolean}
     */
    this.deleted = data.deleted ?? false;

    /**
     * The id of the guild that owns this entitlement
     * @type {?Snowflake}
     */
    this.guildId = data.guild_id ?? null;

    /**
     * The time at which this entitlement starts
     * @type {?Date}
     */
    this.startsAt = data.starts_at ? new Date(data.starts_at) : null;

    /**
     * The time at which this entitlement ends
     * @type {?Date}
     */
    this.endsAt = data.ends_at ? new Date(data.ends_at) : null;

    /**
     * For consumable items, whether or not the entitlement has been consumed
     * @type {?Boolean}
     */
    this.consumed = data.consumed ?? false;
  }

  /**
   * The guild that owns this entitlement
   * @type {?Guild}
   * @readonly
   */
  get guild() {
    return this.client.guilds.cache.get(this.guildId) ?? null;
  }

  /**
   * The user that owns this entitlement
   * @type {?User}
   * @readonly
   */
  get user() {
    return this.client.users.cache.get(this.userId) ?? null;
  }

  /**
   * Fetches this entitlement.
   * @param {BaseFetchOptions} [options] Options for fetching the entitlement
   * @returns {Promise<Entitlement>}
   */
  fetch(options) {
    return this.client.application.entitlements.fetch({ ...options, id: this.id });
  }

  /**
   * Consumes this entitlement.
   * @returns {Promise<void>}
   */
  consume() {
    return this.client.application.entitlements.consume(this.id);
  }

  /**
   * Deletes this entitlement (must be a test entitlement).
   * @returns {Promise<void>}
   */
  delete() {
    return this.client.application.entitlements.deleteTestEntitlement(this.id);
  }

  /**
   * Test whether this entitlement is active
   * @returns {boolean}
   */
  isActive() {
    const now = Date.now();
    return (this.startsAt?.getTime() ?? 0) <= now && (this.endsAt?.getTime() ?? Infinity) >= now;
  }

  _clone() {
    const clone = super._clone();
    return clone;
  }
}

module.exports = Entitlement;
