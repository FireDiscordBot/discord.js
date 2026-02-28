'use strict';

const CachedManager = require('./CachedManager');
const Subscription = require('../structures/Subscription');

/**
 * Manages API methods for subscriptions and stores their cache.
 * @extends {CachedManager}
 */
class SubscriptionManager extends CachedManager {
  constructor(client, iterable) {
    super(client, Subscription, iterable);
  }

  /**
   * Data that can be resolved to a Subscription object. This can be:
   * * A Subscription object
   * * A Snowflake
   * @typedef {Subscription|Snowflake} SubscriptionResolvable
   */

  /**
   * Options for fetching a single subscription.
   * @typedef {BaseFetchOptions} FetchSubscriptionOptions
   * @property {SubscriptionResolvable} [id] The subscription to fetch
   * @property {SKUResolvable} sku The SKU to fetch the subscription for
   */

  /**
   * Options for fetching subscriptions.
   * @typedef {BaseFetchOptions} FetchSubscriptionsOptions
   * @property {SKUResolvable} sku The SKU to fetch subscriptions for
   * @property {Snowflake} [before] Consider only subscriptions before this id
   * @property {Snowflake} [after] Consider only subscriptions after this id
   * @property {number} [limit] The maximum number of subscriptions to fetch
   * @property {boolean} [cache=true] Whether to cache the fetched subscriptions
   * @property {boolean} [force=false] Whether to skip the cache check and request the API
   */

  /**
   * Fetches subscriptions for a SKU.
   * @param {FetchSubscriptionOptions|FetchSubscriptionsOptions} options Options for fetching subscriptions
   * @returns {Promise<Subscription|Collection<Snowflake, Subscription>>}
   */
  async fetch(options) {
    if (typeof options === 'string' || options instanceof Subscription || !options?.sku) {
      throw new TypeError('SUBSCRIPTION_FETCH_SKU_REQUIRED');
    }

    const skuId = this.client.application.skus.resolveId(options.sku);
    if (!skuId) throw new TypeError('INVALID_TYPE', 'options.sku', 'SKUResolvable');

    const id = this.resolveId(options.id ?? options);
    if (id) {
      if (options.force !== true) {
        const cached = this.cache.get(id);
        if (cached) return cached;
      }
      const data = await this.client.api.skus(skuId).subscriptions(id).get();
      return this._add(data, options.cache);
    }

    const query = {
      before: options.before,
      after: options.after,
      limit: options.limit,
    };

    const data = await this.client.api.skus(skuId).subscriptions.get({ query });
    return data.reduce(
      (cache, subscription) => cache.set(subscription.id, this._add(subscription, options.cache)),
      new this.cache.constructor(),
    );
  }
}

module.exports = SubscriptionManager;
