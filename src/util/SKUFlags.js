'use strict';

const BitField = require('./BitField');

/**
 * Data structure that makes it easy to interact with a {@link SKU#flags} bitfield.
 * @extends {BitField}
 */
class SKUFlags extends BitField {}

/**
 * @name SKUFlags
 * @kind constructor
 * @memberof SKUFlags
 * @param {BitFieldResolvable} [bits=0] Bit(s) to read from
 */

/**
 * Bitfield of the packed bits
 * @type {number}
 * @name SKUFlags#bitfield
 */

/**
 * Numeric SKU flags. All available properties:
 * * `AVAILABLE`
 * * `GUILD_SUBSCRIPTION`
 * * `USER_SUBSCRIPTION`
 * @type {Object}
 * @see {@link https://discord.com/developers/docs/resources/sku#sku-object-sku-flags}
 */
SKUFlags.FLAGS = {
  AVAILABLE: 1 << 2,
  GUILD_SUBSCRIPTION: 1 << 7,
  USER_SUBSCRIPTION: 1 << 8,
};

module.exports = SKUFlags;
