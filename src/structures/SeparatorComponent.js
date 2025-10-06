'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { MessageComponentTypes, SeparatorSpacing } = require('../util/Constants');

/**
 * Represents a separator.
 * @extends {BaseMessageComponentV2}
 */
class SeparatorComponent extends BaseMessageComponentV2 {
  /**
   * @typedef {BaseMessageComponentOptions} SeparatorComponentOptions
   * @property {number} [id]
   * Identifier for the separator
   * @property {boolean} [divider=true]
   * Whether a visual divider should be displayed in the component
   * @property {SeparatorSpacingValue} [spacing]
   * Size of separator padding
   */

  /**
   * @param {SeparatorComponentOptions} [data={}] SeparatorComponent to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'SEPARATOR' });

    /**
     * The ID of this separator
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * Whether to display a visual divider
     * @type {boolean}
     */
    this.divider = data.divider ?? true;

    /**
     * Size of separator padding
     * @type {SeparatorSpacingValue}
     */
    this.spacing = data.spacing ? SeparatorSpacing[data.spacing] : 'SMALL';
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {SeparatorComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   *
   * @param {boolean} [divider=true] Whether to display a visual divider
   * @returns {SeparatorComponent}
   */
  displayDivider(divider = true) {
    this.divider = divider;
    return this;
  }

  /**
   * Sets the size of the separator padding
   * @param {SeparatorSpacingValue} [spacing] Size of padding
   * @returns {SeparatorComponent}
   */
  setSpacing(spacing = 1) {
    this.spacing = SeparatorComponent.resolveSpacing(spacing);
    return this;
  }

  /**
   * Transforms the separator to a plain object.
   * @returns {APIMessageComponent} The raw data of this separator
   */
  toJSON() {
    return {
      divider: this.divider ?? true,
      spacing: SeparatorSpacing[this.spacing] ?? 1,
      type: MessageComponentTypes[this.type],
      id: this.id ?? undefined,
    };
  }

  /**
   * Data that can be resolved to SeparatorSpacing. This can be
   * * SeparatorSpacing
   * * number
   * @typedef {number|SeparatorSpacing} SeparatorSpacingResolvable
   */

  /**
   * Resolves the style of a button
   * @param {SeparatorSpacingResolvable} spacing The spacing to resolve
   * @returns {SeparatorSpacing}
   * @private
   */
  static resolveSpacing(spacing) {
    return typeof spacing === 'string' ? spacing : SeparatorSpacing[spacing];
  }
}

module.exports = SeparatorComponent;

/**
 * @external APIMessageComponent
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object}
 */
