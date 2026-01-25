'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { RangeError } = require('../errors');
const { MessageComponentTypes } = require('../util/Constants');
const Util = require('../util/Util');

/**
 * Represents a checkbox component
 * @extends {BaseMessageComponentV2}
 */
class CheckboxComponent extends BaseMessageComponentV2 {
  /**
   * @typedef {BaseMessageComponentOptions} CheckboxComponentOptions
   * @property {string} [customId] A unique string to be sent in the interaction when checked
   * @property {number} [id] Identifier for the checkbox
   * @property {boolean} [default=false] Whether the checkbox is checked by default
   */

  /**
   * @param {CheckboxComponent|CheckboxComponentOptions} [data={}] CheckboxComponent to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'CHECKBOX' });

    this.setup(data);
  }

  setup(data) {
    /**
     * A unique string to be sent in the interaction when checked
     * @type {?string}
     */
    this.customId = data.custom_id ?? data.customId ?? null;

    /**
     * The ID of this checkbox
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * Whether the checkbox is checked by default
     * @type {boolean}
     */
    this.default = data.default ?? false;
  }

  /**
   * Sets the custom id of this checkbox
   * @param {string} customId A unique string to be sent in the interaction when checked
   * @returns {CheckboxComponent}
   */
  setCustomId(customId) {
    this.customId = Util.verifyString(customId, RangeError, 'CHECKBOX_CUSTOM_ID');
    return this;
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {CheckboxComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Sets whether this checkbox is checked by default
   * @param {boolean} [checked=true] Whether this checkbox should be checked by default
   * @returns {CheckboxComponent}
   */
  setDefault(checked = true) {
    this.default = checked;
    return this;
  }

  /**
   * Transforms the checkbox into a plain object
   * @returns {APICheckboxComponent} The raw data of this checkbox
   */
  toJSON() {
    return {
      custom_id: this.customId,
      default: this.default,
      type: typeof this.type === 'string' ? MessageComponentTypes[this.type] : this.type,
      id: this.id ?? undefined,
    };
  }
}

module.exports = CheckboxComponent;
