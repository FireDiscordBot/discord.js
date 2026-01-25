'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { RangeError } = require('../errors');
const { MessageComponentTypes } = require('../util/Constants');
const Util = require('../util/Util');

/**
 * Represents a radio group component
 * @extends {BaseMessageComponentV2}
 */
class RadioGroupComponent extends BaseMessageComponentV2 {
  /**
   * @typedef {BaseMessageComponentOptions} RadioGroupComponentOptions
   * @property {string} [customId] A unique string to be sent in the interaction when submitted
   * @property {number} [id] Identifier for the radio group
   * @property {RadioGroupOption[]} [options] Options for the radio group
   * @property {boolean} [required=false] Whether the radio group is required
   */

  /**
   * @typedef {Object} RadioGroupOption
   * @property {string} label The text to be displayed on this option
   * @property {string} value The value to be sent for this option
   * @property {string} [description] Optional description to show for this option
   * @property {boolean} [default] Render this option as the default selection
   */

  /**
   * @typedef {Object} RadioGroupOptionData
   * @property {string} label The text to be displayed on this option
   * @property {string} value The value to be sent for this option
   * @property {string} [description] Optional description to show for this option
   * @property {boolean} [default] Render this option as the default selection
   */

  /**
   * @param {RadioGroupComponent|RadioGroupComponentOptions} [data={}] RadioGroupComponent to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'RADIO_GROUP' });

    this.setup(data);
  }

  setup(data) {
    /**
     * A unique string to be sent in the interaction when submitted
     * @type {?string}
     */
    this.customId = data.custom_id ?? data.customId ?? null;

    /**
     * The ID of this radio group
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * Options for the radio group
     * @type {RadioGroupOption[]}
     */
    this.options = this.constructor.normalizeOptions(data.options ?? []);

    /**
     * Whether this radio group is required
     * @type {boolean}
     */
    this.required = data.required ?? false;
  }

  /**
   * Sets the custom id of this radio group
   * @param {string} customId A unique string to be sent in the interaction when submitted
   * @returns {RadioGroupComponent}
   */
  setCustomId(customId) {
    this.customId = Util.verifyString(customId, RangeError, 'RADIO_GROUP_CUSTOM_ID');
    return this;
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {RadioGroupComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Sets whether this radio group is required
   * @param {boolean} [required=true] Whether this radio group should be required
   * @returns {RadioGroupComponent}
   */
  setRequired(required = true) {
    this.required = required;
    return this;
  }

  /**
   * Adds options to the radio group.
   * @param {...RadioGroupOptionData|RadioGroupOptionData[]} options The options to add
   * @returns {RadioGroupComponent}
   */
  addOptions(...options) {
    this.options.push(...this.constructor.normalizeOptions(options));
    return this;
  }

  /**
   * Sets the options of the radio group.
   * @param {...RadioGroupOptionData|RadioGroupOptionData[]} options The options to set
   * @returns {RadioGroupComponent}
   */
  setOptions(...options) {
    this.spliceOptions(0, this.options.length, options);
    return this;
  }

  /**
   * Removes, replaces, and inserts options in the radio group.
   * @param {number} index The index to start at
   * @param {number} deleteCount The number of options to remove
   * @param {...RadioGroupOptionData|RadioGroupOptionData[]} [options] The replacing option objects
   * @returns {RadioGroupComponent}
   */
  spliceOptions(index, deleteCount, ...options) {
    this.options.splice(index, deleteCount, ...this.constructor.normalizeOptions(...options));
    return this;
  }

  /**
   * Transforms the radio group into a plain object
   * @returns {APIRadioGroupComponent} The raw data of this radio group
   */
  toJSON() {
    return {
      custom_id: this.customId,
      options: this.options,
      required: this.required,
      type: typeof this.type === 'string' ? MessageComponentTypes[this.type] : this.type,
      id: this.id ?? undefined,
    };
  }

  /**
   * Normalizes option input.
   * @param {RadioGroupOptionData} option The radio group option to normalize
   * @returns {RadioGroupOption}
   */
  static normalizeOption(option) {
    let { label, value, description } = option;

    label = Util.verifyString(label, RangeError, 'RADIO_GROUP_OPTION_LABEL');
    value = Util.verifyString(value, RangeError, 'RADIO_GROUP_OPTION_VALUE');
    description = description
      ? Util.verifyString(description, RangeError, 'RADIO_GROUP_OPTION_DESCRIPTION', true)
      : undefined;

    return { label, value, description, default: option.default ?? false };
  }

  /**
   * Normalizes option input.
   * @param {...RadioGroupOptionData|RadioGroupOptionData[]} options The radio group options to normalize
   * @returns {RadioGroupOption[]}
   */
  static normalizeOptions(...options) {
    return options.flat(Infinity).map(option => this.normalizeOption(option));
  }
}

module.exports = RadioGroupComponent;
