'use strict';

const BaseSelectMenu = require('./BaseSelectMenu');
const { MessageComponentTypes } = require('../util/Constants');

/**
 * Represents a select menu message component
 * @extends {BaseSelectMenu}
 */
class RoleSelectMenu extends BaseSelectMenu {
  /**
   * @typedef {BaseSelectMenuOptions} RoleSelectMenuOptions
   * @property {RoleSelectMenuDefaultValue[]} [defaultValues] Default values for the select menu
   */

  /**
   * @typedef {Object} RoleSelectMenuDefaultValue
   * @property {Snowflake} id The id of the role
   * @property {"role"} type The type of default value, always "role"
   */

  /**
   * @param {RoleSelectMenu|RoleSelectMenuOptions} [data={}] MessageSelectMenu to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'ROLE_SELECT' });

    this.setup(data);
  }

  setup(data) {
    super.setup(data);

    /**
     * Options for the select menu
     * @type {RoleSelectMenuDefaultValue[]}
     */
    this.defaultValues = data.default_values ?? [];
  }

  /**
   * Adds default values to the select menu.
   * @param {...RoleSelectMenuDefaultValue|RoleSelectMenuDefaultValue[]} values The options to add
   * @returns {MessageSelectMenu}
   */
  addDefaultValues(...values) {
    this.defaultValues.push(...values);
    return this;
  }

  /**
   * Sets the default values of the select menu.
   * @param {...RoleSelectMenuDefaultValue|RoleSelectMenuDefaultValue[]} values The values to set
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
   * @param {...RoleSelectMenuDefaultValue|RoleSelectMenuDefaultValue[]} [values] The replacing value objects
   * @returns {MessageSelectMenu}
   */
  spliceDefaultValues(index, deleteCount, ...values) {
    this.defaultValues.splice(index, deleteCount, ...values.flat(Infinity));
    return this;
  }

  /**
   * Transforms the select menu into a plain object
   * @returns {APIRoleSelectComponent} The raw data of this select menu
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
    };
  }
}

module.exports = RoleSelectMenu;
