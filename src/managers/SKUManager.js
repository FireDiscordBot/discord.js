'use strict';

const CachedManager = require('./CachedManager');
const SKU = require('../structures/SKU');

/**
 * Manages API methods for SKUs and stores their cache.
 * @extends {CachedManager}
 */
class SKUManager extends CachedManager {
  constructor(client, iterable) {
    super(client, SKU, iterable);
  }

  /**
   * Data that can be resolved to a SKU object. This can be:
   * * A SKU object
   * * A Snowflake
   * @typedef {SKU|Snowflake} SKUResolvable
   */

  /**
   * Options for fetching SKUs.
   * @typedef {BaseFetchOptions} SKUFetchOptions
   * @property {SKUResolvable} [id] The SKU to fetch
   */

  /**
   * Fetches SKUs for this application.
   * @param {SKUResolvable|SKUFetchOptions} [options] Options for fetching SKUs
   * @returns {Promise<SKU|Collection<Snowflake, SKU>>}
   */
  async fetch(options) {
    const id = this.resolveId(options?.id ?? options);
    if (id) {
      if (options?.force !== true) {
        const cached = this.cache.get(id);
        if (cached) return cached;
      }
      const data = await this.client.api.applications(this.client.application.id).skus(id).get();
      return this._add(data, options?.cache);
    }

    const data = await this.client.api.applications(this.client.application.id).skus.get();
    return data.reduce((cache, sku) => cache.set(sku.id, this._add(sku, options?.cache)), new this.cache.constructor());
  }
}

module.exports = SKUManager;
