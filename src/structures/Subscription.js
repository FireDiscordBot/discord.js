'use strict';

const Base = require('./Base');
const { TypeError } = require('../errors');
const { SubscriptionStatuses } = require('../util/Constants');

/**
 * Represents a subscription.
 * @extends {Base}
 */
class Subscription extends Base {
  constructor(client, data) {
    super(client);

    /**
     * The subscription's id
     * @type {Snowflake}
     */
    this.id = data.id;

    if (data) this._patch(data);
  }

  _patch(data) {
    /**
     * The id of the user that owns this subscription
     * @type {Snowflake}
     */
    this.userId = data.user_id;

    /**
     * The ids of the SKUs this subscription is for
     * @type {Snowflake[]}
     */
    this.skuIds = data.sku_ids;

    /**
     * The ids of the entitlements granted by this subscription
     * @type {Snowflake[]}
     */
    this.entitlementIds = data.entitlement_ids;

    /**
     * The time at which the current subscription period started
     * @type {Date}
     */
    this.currentPeriodStart = new Date(data.current_period_start);

    /**
     * The time at which the current subscription period ends
     * @type {Date}
     */
    this.currentPeriodEnd = new Date(data.current_period_end);

    /**
     * The status of the subscription
     * @type {SubscriptionStatus}
     */
    this.status = SubscriptionStatuses[data.status];

    /**
     * List of SKUs that this user will be subscribed to at renewal
     * @type {?Snowflake[]}
     */
    this.renewalSkuIds = data.renewal_sku_ids ?? null;

    /**
     * The time at which the subscription was canceled, if applicable
     * @type {?Date}
     */
    this.canceledAt = data.canceled_at ? new Date(data.canceled_at) : null;

    /**
     * The country code of the user that owns this subscription
     * @type {?string}
     */
    this.country = data.country ?? null;
  }

  /**
   * The user that owns this subscription
   * @type {?User}
   * @readonly
   */
  get user() {
    return this.client.users.cache.get(this.userId) ?? null;
  }

  /**
   * Options for fetching a subscription.
   * @typedef {BaseFetchOptions} SubscriptionFetchOptions
   * @property {SKUResolvable} [sku] The SKU to fetch the subscription for
   */

  /**
   * Fetches this subscription.
   * @param {SubscriptionFetchOptions} [options] Options for fetching the subscription
   * @returns {Promise<Subscription>}
   */
  fetch(options) {
    const skuId = this.client.application.skus.resolveId(options?.sku) ?? this.skuIds?.[0];
    if (!skuId) throw new TypeError('SUBSCRIPTION_FETCH_SKU_REQUIRED');
    return this.client.application.subscriptions.fetch({ ...options, id: this.id, sku: skuId });
  }

  /**
   * The SKUs this subscription is for
   * @type {Collection<Snowflake, SKU>}
   * @readonly
   */
  get skus() {
    const { skus } = this.client.application;
    return skus.cache.filter(sku => this.skuIds.includes(sku.id));
  }

  /**
   * The entitlements granted by this subscription
   * @type {Collection<Snowflake, Entitlement>}
   * @readonly
   */
  get entitlements() {
    const { entitlements } = this.client.application;
    return entitlements.cache.filter(entitlement => this.entitlementIds.includes(entitlement.id));
  }

  /**
   * The SKUs that this user will be subscribed to at renewal
   * @type {Collection<Snowflake, SKU>}
   * @readonly
   */
  get renewalSkus() {
    const { skus } = this.client.application;
    return skus.cache.filter(sku => this.renewalSkuIds?.includes(sku.id));
  }

  _clone() {
    const clone = super._clone();
    return clone;
  }
}

module.exports = Subscription;
