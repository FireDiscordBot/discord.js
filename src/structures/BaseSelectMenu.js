'use strict';

const BaseMessageComponent = require('./BaseMessageComponent');
const { MessageComponentTypes } = require('../util/Constants');
const Util = require('../util/Util');

/**
 * Represents a select menu message component
 * @extends {BaseMessageComponent}
 */
class BaseSelectMenu extends BaseMessageComponent {
  /**
   * @typedef {BaseMessageComponentOptions} BaseSelectMenuOptions
   * @property {string} [customId] A unique string to be sent in the interaction when clicked
   * @property {string} [placeholder] Custom placeholder text to display when nothing is selected
   * @property {number} [minValues] The minimum number of selections required
   * @property {number} [maxValues] The maximum number of selections allowed
   * @property {boolean} [disabled=false] Disables the select menu to prevent interactions
   */

  /**
   * @param {BaseSelectMenu|BaseSelectMenuOptions} [data={}] BaseSelectMenu to clone or raw data
   */
  constructor(data = { type: 'SELECT_MENU' }) {
    super({ type: data.type });

    this.setup(data);
  }

  setup(data) {
    /**
     * A unique string to be sent in the interaction when clicked
     * @type {?string}
     */
    this.customId = data.custom_id ?? data.customId ?? null;

    /**
     * Custom placeholder text to display when nothing is selected
     * @type {?string}
     */
    this.placeholder = data.placeholder ?? null;

    /**
     * The minimum number of selections required
     * @type {?number}
     */
    this.minValues = data.min_values ?? data.minValues ?? null;

    /**
     * The maximum number of selections allowed
     * @type {?number}
     */
    this.maxValues = data.max_values ?? data.maxValues ?? null;

    /**
     * Whether this select menu is required in modals
     * @type {boolean}
     */
    this.required = data.required ?? true;

    /**
     * Whether this select menu is currently disabled
     * @type {boolean}
     */
    this.disabled = data.disabled ?? false;
  }

  /**
   * Sets the custom id of this select menu
   * @param {string} customId A unique string to be sent in the interaction when clicked
   * @returns {BaseSelectMenu}
   */
  setCustomId(customId) {
    this.customId = Util.verifyString(customId, RangeError, 'SELECT_MENU_CUSTOM_ID');
    return this;
  }

  /**
   * Sets the required status of the select menu
   * @param {boolean} [required=true] Whether this select menu should be required
   * @returns {BaseSelectMenu}
   */
  setRequired(required = true) {
    this.required = required;
    return this;
  }

  /**
   * Sets the interactive status of the select menu
   * @param {boolean} [disabled=true] Whether this select menu should be disabled
   * @returns {BaseSelectMenu}
   */
  setDisabled(disabled = true) {
    this.disabled = disabled;
    return this;
  }

  /**
   * Sets the maximum number of selections allowed for this select menu
   * @param {number} maxValues Number of selections to be allowed
   * @returns {BaseSelectMenu}
   */
  setMaxValues(maxValues) {
    this.maxValues = maxValues;
    return this;
  }

  /**
   * Sets the minimum number of selections required for this select menu
   * <info>This will default the maxValues to the number of options, unless manually set</info>
   * @param {number} minValues Number of selections to be required
   * @returns {BaseSelectMenu}
   */
  setMinValues(minValues) {
    this.minValues = minValues;
    return this;
  }

  /**
   * Sets the placeholder of this select menu
   * @param {string} placeholder Custom placeholder text to display when nothing is selected
   * @returns {BaseSelectMenu}
   */
  setPlaceholder(placeholder) {
    this.placeholder = Util.verifyString(placeholder, RangeError, 'SELECT_MENU_PLACEHOLDER');
    return this;
  }

  /**
   * Transforms the select menu into a plain object
   * @returns {APIStringSelectComponent} The raw data of this select menu
   */
  toJSON() {
    return {
      custom_id: this.customId,
      disabled: this.disabled,
      required: this.required,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues ?? (this.minValues ? this.options.length : undefined),
      type: typeof this.type === 'string' ? MessageComponentTypes[this.type] : this.type,
    };
  }
}

module.exports = BaseSelectMenu;
