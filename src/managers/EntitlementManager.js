'use strict';

const CachedManager = require('./CachedManager');
const Entitlement = require('../structures/Entitlement');
const { EntitlementOwnerTypes } = require('../util/Constants');

/**
 * Manages API methods for entitlements and stores their cache.
 * @extends {CachedManager}
 */
class EntitlementManager extends CachedManager {
  constructor(client, iterable) {
    super(client, Entitlement, iterable);
  }

  /**
   * Data that can be resolved to an Entitlement object. This can be:
   * * An Entitlement object
   * * A Snowflake
   * @typedef {Entitlement|Snowflake} EntitlementResolvable
   */

  /**
   * Options for fetching entitlements.
   * @typedef {BaseFetchOptions} FetchEntitlementsOptions
   * @property {Snowflake} [id] The entitlement's id
   * @property {Snowflake} [userId] The id of the user to fetch entitlements for
   * @property {Snowflake[]} [skuIds] The ids of the SKUs to fetch entitlements for
   * @property {Snowflake} [before] Consider only entitlements before this id
   * @property {Snowflake} [after] Consider only entitlements after this id
   * @property {number} [limit] The maximum number of entitlements to fetch
   * @property {Snowflake} [guildId] The id of the guild to fetch entitlements for
   * @property {boolean} [excludeEnded] Whether to exclude ended entitlements
   * @property {boolean} [excludeDeleted] Whether to exclude deleted entitlements
   * @property {boolean} [cache=true] Whether to cache the fetched entitlements
   * @property {boolean} [force=false] Whether to skip the cache check and request the API
   */

  /**
   * Fetches entitlements for this application.
   * @param {EntitlementResolvable|FetchEntitlementsOptions} [options={}] Options for fetching entitlements
   * @returns {Promise<Entitlement|Collection<Snowflake, Entitlement>>}
   */
  async fetch(options = {}) {
    const id = this.resolveId(options?.id ?? options);
    if (id) {
      if (options?.force !== true) {
        const cached = this.cache.get(id);
        if (cached) return cached;
      }
      const data = await this.client.api.applications(this.client.application.id).entitlements(id).get();
      return this._add(data, options?.cache);
    }

    const query = {};
    if (options.userId) query.user_id = options.userId;
    if (options.skuIds) query.sku_ids = options.skuIds.join(',');
    if (options.before) query.before = options.before;
    if (options.after) query.after = options.after;
    if (options.limit) query.limit = options.limit;
    if (options.guildId) query.guild_id = options.guildId;
    if (options.excludeEnded) query.exclude_ended = options.excludeEnded;
    if (options.excludeDeleted) query.exclude_deleted = options.excludeDeleted;

    const data = await this.client.api.applications(this.client.application.id).entitlements.get({ query });
    return data.reduce(
      (cache, entitlement) => cache.set(entitlement.id, this._add(entitlement, options.cache)),
      new this.cache.constructor(),
    );
  }

  /**
   * Creates a test entitlement.
   * @param {Snowflake} skuId The id of the SKU to create the entitlement for
   * @param {Snowflake} ownerId The id of the owner (user or guild)
   * @param {EntitlementOwnerType|number} ownerType The type of the owner
   * @returns {Promise<Entitlement>}
   */
  async createTestEntitlement(skuId, ownerId, ownerType) {
    const resolvedOwnerType = typeof ownerType === 'string' ? EntitlementOwnerTypes[ownerType] : ownerType;
    const data = await this.client.api.applications(this.client.application.id).entitlements.post({
      data: {
        sku_id: skuId,
        owner_id: ownerId,
        owner_type: resolvedOwnerType,
      },
    });
    return this._add(data);
  }

  /**
   * Deletes a test entitlement.
   * @param {EntitlementResolvable} entitlement The entitlement to delete
   * @returns {Promise<void>}
   */
  async deleteTestEntitlement(entitlement) {
    const id = this.resolveId(entitlement);
    await this.client.api.applications(this.client.application.id).entitlements(id).delete();
    this.cache.delete(id);
  }

  /**
   * Consumes a consumable entitlement.
   * @param {EntitlementResolvable} entitlement The entitlement to consume
   * @returns {Promise<void>}
   */
  async consume(entitlement) {
    const id = this.resolveId(entitlement);
    await this.client.api.applications(this.client.application.id).entitlements(id).consume.post();
  }
}

module.exports = EntitlementManager;
