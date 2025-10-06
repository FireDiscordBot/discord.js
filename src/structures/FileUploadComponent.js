'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { MessageComponentTypes } = require('../util/Constants');
const Util = require('../util/Util');

/**
 * Represents a file upload component
 * @extends {BaseMessageComponentV2}
 */
class FileUploadComponent extends BaseMessageComponentV2 {
  /**
   * @typedef {BaseMessageComponentOptions} FileUploadComponentOptions
   * @property {string} [customId] A unique string to be sent in the interaction when submitted
   * @property {number} [id] Identifier for the file upload
   * @property {number} [minValues] The minimum number of files required
   * @property {number} [maxValues] The maximum number of files allowed
   * @property {boolean} [required=false] Whether the upload is required
   */

  /**
   * @param {FileUploadComponent|FileUploadComponentOptions} [data={}] FileUploadComponent to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'FILE_UPLOAD' });

    /**
     * A unique string to be sent in the interaction when submitted
     * @type {?string}
     */
    this.customId = data.custom_id ?? data.customId ?? null;

    /**
     * The ID of this file upload
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * The minimum number of files required
     * @type {?number}
     */
    this.minValues = data.min_values ?? data.minValues ?? null;

    /**
     * The maximum number of files allowed
     * @type {?number}
     */
    this.maxValues = data.max_values ?? data.maxValues ?? null;

    /**
     * Whether this file upload is required
     * @type {boolean}
     */
    this.required = data.required ?? false;
  }

  /**
   * Sets the custom id of this file upload
   * @param {string} customId A unique string to be sent in the interaction when submitted
   * @returns {FileUploadComponent}
   */
  setCustomId(customId) {
    this.customId = Util.verifyString(customId, RangeError, 'FILE_UPLOAD_CUSTOM_ID');
    return this;
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {FileUploadComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Sets whether uploading a file is required
   * @param {boolean} [required=true] Whether this file upload should be required
   * @returns {FileUploadComponent}
   */
  setRequired(required = true) {
    this.required = required;
    return this;
  }

  /**
   * Sets the maximum number of files allowed for this upload
   * @param {number} maxValues Number of files to be allowed
   * @returns {FileUploadComponent}
   */
  setMaxValues(maxValues) {
    this.maxValues = maxValues;
    return this;
  }

  /**
   * Sets the minimum number of files required for this upload
   * @param {number} minValues Number of files to be required
   * @returns {FileUploadComponent}
   */
  setMinValues(minValues) {
    this.minValues = minValues;
    return this;
  }

  /**
   * Transforms the file upload into a plain object
   * @returns {APIFileUploadComponent} The raw data of this file upload
   */
  toJSON() {
    return {
      custom_id: this.customId,
      required: this.required,
      min_values: this.minValues,
      max_values: this.maxValues ?? undefined,
      type: typeof this.type === 'string' ? MessageComponentTypes[this.type] : this.type,
      id: this.id ?? undefined,
    };
  }
}

module.exports = FileUploadComponent;
