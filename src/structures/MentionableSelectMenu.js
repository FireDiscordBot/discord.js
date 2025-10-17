'use strict';

const BaseSelectMenu = require('./BaseSelectMenu');
const { MessageComponentTypes } = require('../util/Constants');

/**
 * Represents a select menu message component
 * @extends {BaseSelectMenu}
 */
class MentionableSelectMenu extends BaseSelectMenu {
  /**
   * @typedef {BaseSelectMenuOptions} MentionableSelectMenuOptions
   * @property {MentionableSelectMenuDefaultValue[]} [defaultValues] Default values for the select menu
   */

  /**
   * @typedef {Object} MentionableSelectMenuDefaultValue
   * @property {Snowflake} id The id of the mentionable object
   * @property {"user"|"role"} type The type of default value
   */

  /**
   * @param {MentionableSelectMenu|MentionableSelectMenuOptions} [data={}] MessageSelectMenu to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'MENTIONABLE_SELECT' });

    this.setup(data);
  }

  setup(data) {
    super.setup(data);

    /**
     * Options for the select menu
     * @type {MentionableSelectMenuDefaultValue[]}
     */
    this.defaultValues = data.default_values ?? [];
  }

  /**
   * Adds default values to the select menu.
   * @param {...MentionableSelectMenuDefaultValue|MentionableSelectMenuDefaultValue[]} values The options to add
   * @returns {MessageSelectMenu}
   */
  addDefaultValues(...values) {
    this.defaultValues.push(...values);
    return this;
  }

  /**
   * Sets the default values of the select menu.
   * @param {...MentionableSelectMenuDefaultValue|MentionableSelectMenuDefaultValue[]} values The values to set
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
   * @param {...MentionableSelectMenuDefaultValue|MentionableSelectMenuDefaultValue[]} [values] The replacing values
   * @returns {MessageSelectMenu}
   */
  spliceDefaultValues(index, deleteCount, ...values) {
    this.defaultValues.splice(index, deleteCount, ...values.flat(Infinity));
    return this;
  }

  /**
   * Transforms the select menu into a plain object
   * @returns {APIMentionableSelectComponent} The raw data of this select menu
   */
  toJSON() {
    return {
      custom_id: this.customId,
      disabled: this.disabled,
      required: this.required,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues ?? (this.minValues ? this.defaultValues.length : undefined),
      default_values: this.defaultValues,
      type: typeof this.type === 'string' ? MessageComponentTypes[this.type] : this.type,
    };
  }
}

module.exports = MentionableSelectMenu;
