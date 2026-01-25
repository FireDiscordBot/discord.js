'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { RangeError } = require('../errors');
const { MessageComponentTypes } = require('../util/Constants');
const Util = require('../util/Util');

/**
 * Represents a checkbox group component
 * @extends {BaseMessageComponentV2}
 */
class CheckboxGroupComponent extends BaseMessageComponentV2 {
  /**
   * @typedef {BaseMessageComponentOptions} CheckboxGroupComponentOptions
   * @property {string} [customId] A unique string to be sent in the interaction when submitted
   * @property {number} [id] Identifier for the checkbox group
   * @property {CheckboxGroupOption[]} [options] Options for the checkbox group
   * @property {number} [minValues] The minimum number of selections required
   * @property {number} [maxValues] The maximum number of selections allowed
   * @property {boolean} [required=false] Whether the checkbox group is required
   */

  /**
   * @typedef {Object} CheckboxGroupOption
   * @property {string} label The text to be displayed on this option
   * @property {string} value The value to be sent for this option
   * @property {string} [description] Optional description to show for this option
   * @property {boolean} [default] Render this option as the default selection
   */

  /**
   * @typedef {Object} CheckboxGroupOptionData
   * @property {string} label The text to be displayed on this option
   * @property {string} value The value to be sent for this option
   * @property {string} [description] Optional description to show for this option
   * @property {boolean} [default] Render this option as the default selection
   */

  /**
   * @param {CheckboxGroupComponent|CheckboxGroupComponentOptions} [data={}] CheckboxGroupComponent to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'CHECKBOX_GROUP' });

    this.setup(data);
  }

  setup(data) {
    /**
     * A unique string to be sent in the interaction when submitted
     * @type {?string}
     */
    this.customId = data.custom_id ?? data.customId ?? null;

    /**
     * The ID of this checkbox group
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * Options for the checkbox group
     * @type {CheckboxGroupOption[]}
     */
    this.options = this.constructor.normalizeOptions(data.options ?? []);

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
     * Whether this checkbox group is required
     * @type {boolean}
     */
    this.required = data.required ?? false;
  }

  /**
   * Sets the custom id of this checkbox group
   * @param {string} customId A unique string to be sent in the interaction when submitted
   * @returns {CheckboxGroupComponent}
   */
  setCustomId(customId) {
    this.customId = Util.verifyString(customId, RangeError, 'CHECKBOX_GROUP_CUSTOM_ID');
    return this;
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {CheckboxGroupComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Sets whether this checkbox group is required
   * @param {boolean} [required=true] Whether this checkbox group should be required
   * @returns {CheckboxGroupComponent}
   */
  setRequired(required = true) {
    this.required = required;
    return this;
  }

  /**
   * Sets the maximum number of selections allowed for this checkbox group
   * @param {number} maxValues Number of selections to be allowed
   * @returns {CheckboxGroupComponent}
   */
  setMaxValues(maxValues) {
    this.maxValues = maxValues;
    return this;
  }

  /**
   * Sets the minimum number of selections required for this checkbox group
   * @param {number} minValues Number of selections to be required
   * @returns {CheckboxGroupComponent}
   */
  setMinValues(minValues) {
    this.minValues = minValues;
    return this;
  }

  /**
   * Adds options to the checkbox group.
   * @param {...CheckboxGroupOptionData|CheckboxGroupOptionData[]} options The options to add
   * @returns {CheckboxGroupComponent}
   */
  addOptions(...options) {
    this.options.push(...this.constructor.normalizeOptions(options));
    return this;
  }

  /**
   * Sets the options of the checkbox group.
   * @param {...CheckboxGroupOptionData|CheckboxGroupOptionData[]} options The options to set
   * @returns {CheckboxGroupComponent}
   */
  setOptions(...options) {
    this.spliceOptions(0, this.options.length, options);
    return this;
  }

  /**
   * Removes, replaces, and inserts options in the checkbox group.
   * @param {number} index The index to start at
   * @param {number} deleteCount The number of options to remove
   * @param {...CheckboxGroupOptionData|CheckboxGroupOptionData[]} [options] The replacing option objects
   * @returns {CheckboxGroupComponent}
   */
  spliceOptions(index, deleteCount, ...options) {
    this.options.splice(index, deleteCount, ...this.constructor.normalizeOptions(...options));
    return this;
  }

  /**
   * Transforms the checkbox group into a plain object
   * @returns {APICheckboxGroupComponent} The raw data of this checkbox group
   */
  toJSON() {
    return {
      custom_id: this.customId,
      options: this.options,
      min_values: this.minValues,
      max_values: this.maxValues ?? undefined,
      required: this.required,
      type: typeof this.type === 'string' ? MessageComponentTypes[this.type] : this.type,
      id: this.id ?? undefined,
    };
  }

  /**
   * Normalizes option input.
   * @param {CheckboxGroupOptionData} option The checkbox group option to normalize
   * @returns {CheckboxGroupOption}
   */
  static normalizeOption(option) {
    let { label, value, description } = option;

    label = Util.verifyString(label, RangeError, 'CHECKBOX_GROUP_OPTION_LABEL');
    value = Util.verifyString(value, RangeError, 'CHECKBOX_GROUP_OPTION_VALUE');
    description = description
      ? Util.verifyString(description, RangeError, 'CHECKBOX_GROUP_OPTION_DESCRIPTION', true)
      : undefined;

    return { label, value, description, default: option.default ?? false };
  }

  /**
   * Normalizes option input.
   * @param {...CheckboxGroupOptionData|CheckboxGroupOptionData[]} options The checkbox group options to normalize
   * @returns {CheckboxGroupOption[]}
   */
  static normalizeOptions(...options) {
    return options.flat(Infinity).map(option => this.normalizeOption(option));
  }
}

module.exports = CheckboxGroupComponent;
