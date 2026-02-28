'use strict';

const Base = require('./Base');
const { SKUTypes } = require('../util/Constants');
const SKUFlags = require('../util/SKUFlags');

/**
 * Represents a SKU.
 * @extends {Base}
 */
class SKU extends Base {
  constructor(client, data) {
    super(client);

    /**
     * The SKU's id
     * @type {Snowflake}
     */
    this.id = data.id;

    if (data) this._patch(data);
  }

  _patch(data) {
    /**
     * The type of SKU
     * @type {SKUType}
     */
    this.type = SKUTypes[data.type];

    /**
     * The id of the application this SKU is for
     * @type {Snowflake}
     */
    this.applicationId = data.application_id;

    /**
     * The SKU's name
     * @type {string}
     */
    this.name = data.name;

    /**
     * The SKU's slug
     * @type {string}
     */
    this.slug = data.slug;

    /**
     * The SKU's flags
     * @type {SKUFlags}
     */
    this.flags = new SKUFlags(data.flags).freeze();
  }

  /**
   * The subscriptions manager for this SKU
   * @type {SubscriptionManager}
   * @readonly
   */
  get subscriptions() {
    return new Proxy(this.client.application.subscriptions, {
      get: (target, prop) => {
        if (prop === 'fetch') {
          return (options = {}) => {
            if (typeof options === 'string' || options instanceof target.holds) {
              return target.fetch({ id: target.resolveId(options), sku: this });
            }
            return target.fetch({ ...options, sku: this });
          };
        }
        return target[prop];
      },
    });
  }

  /**
   * The application this SKU is for
   * @type {?ClientApplication}
   * @readonly
   */
  get application() {
    return this.client.application;
  }

  /**
   * Fetches this SKU.
   * @param {BaseFetchOptions} [options] Options for fetching the SKU
   * @returns {Promise<SKU>}
   */
  fetch(options) {
    return this.client.application.skus.fetch({ ...options, id: this.id });
  }

  _clone() {
    const clone = super._clone();
    return clone;
  }
}

module.exports = SKU;
