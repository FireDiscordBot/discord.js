'use strict';

const BaseSelectMenu = require('./BaseSelectMenu');
const { MessageComponentTypes, ChannelTypes } = require('../util/Constants');

/**
 * Represents a select menu message component
 * @extends {BaseSelectMenu}
 */
class ChannelSelectMenu extends BaseSelectMenu {
  /**
   * @typedef {BaseSelectMenuOptions} ChannelSelectMenuOptions
   * @property {ChannelSelectMenuDefaultValue[]} [defaultValues] Default values for the select menu
   */

  /**
   * @typedef {Object} ChannelSelectMenuDefaultValue
   * @property {Snowflake} id The id of the channel
   * @property {"channel"} type The type of default value, always "channel"
   */

  /**
   * @param {ChannelSelectMenu|ChannelSelectMenuOptions} [data={}] MessageSelectMenu to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'CHANNEL_SELECT' });

    this.setup(data);
  }

  setup(data) {
    super.setup(data);

    /**
     * Options for the select menu
     * @type {ChannelSelectMenuDefaultValue[]}
     */
    this.defaultValues = data.default_values ?? [];

    /**
     * The channel types to filter the selectable channels
     * @type {ChannelTypes[]}
     */

    this.channelTypes = data.channel_types?.map(type => ChannelTypes[type]) ?? [];
  }

  /**
   * Adds default values to the select menu.
   * @param {...ChannelSelectMenuDefaultValue|ChannelSelectMenuDefaultValue[]} values The options to add
   * @returns {MessageSelectMenu}
   */
  addDefaultValues(...values) {
    this.defaultValues.push(...values);
    return this;
  }

  /**
   * Sets the default values of the select menu.
   * @param {...ChannelSelectMenuDefaultValue|ChannelSelectMenuDefaultValue[]} values The values to set
   * @returns {MessageSelectMenu}
   */
  setDefaultValues(...values) {
    this.spliceDefaultValues(0, this.defaultValues.length, ...values);
    return this;
  }

  /**
   * Removes, replaces, and inserts default values in the select menu.
   * @param {number} index The index to start at
   * @param {number} deleteCount The number of values to remove
   * @param {...ChannelSelectMenuDefaultValue|ChannelSelectMenuDefaultValue[]} [values] The replacing value objects
   * @returns {MessageSelectMenu}
   */
  spliceDefaultValues(index, deleteCount, ...values) {
    this.defaultValues.splice(index, deleteCount, ...values.flat(Infinity));
    return this;
  }

  /**
   * Adds channel types to the select menu.
   * @param {...ChannelTypes|ChannelTypes[]} types The channel types to add
   * @returns {ChannelSelectMenu}
   */
  addChannelTypes(...types) {
    this.channelTypes.push(...types);
    return this;
  }

  /**
   * Sets the channel types of the select menu.
   * @param {...ChannelTypes|ChannelTypes[]} types The channel types to set
   * @returns {ChannelSelectMenu}
   */
  setChannelTypes(...types) {
    this.spliceChannelTypes(0, this.channelTypes.length, types);
    return this;
  }

  /**
   * Splices the channel types of the select menu.
   * @param {number} index The index to start at
   * @param {number} deleteCount The number of types to remove
   * @param {...ChannelTypes|ChannelTypes[]} types The replacing channel types
   * @returns {ChannelSelectMenu}
   */
  spliceChannelTypes(index, deleteCount, ...types) {
    this.channelTypes.splice(index, deleteCount, ...types);
    return this;
  }

  /**
   * Clears the channel types of the select menu.
   * @returns {ChannelSelectMenu}
   */
  clearChannelTypes() {
    this.channelTypes = [];
    return this;
  }

  /**
   * Transforms the select menu into a plain object
   * @returns {APIChannelSelectComponent} The raw data of this select menu
   */
  toJSON() {
    return {
      custom_id: this.customId,
      disabled: this.disabled,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues ?? (this.minValues ? this.defaultValues.length : undefined),
      default_values: this.defaultValues,
      type: typeof this.type === 'string' ? MessageComponentTypes[this.type] : this.type,
      channel_types: this.channelTypes.length ? this.channelTypes : undefined,
    };
  }
}

module.exports = ChannelSelectMenu;
