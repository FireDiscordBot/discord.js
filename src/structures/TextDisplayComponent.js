'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { MessageComponentTypes } = require('../util/Constants');

/**
 * Represents a display of text.
 * @extends {BaseMessageComponentV2}
 */
class TextDisplayComponent extends BaseMessageComponentV2 {
  /**
   * @typedef {BaseMessageComponentOptions} TextDisplayComponentOptions
   * @property {number} [id]
   * Identifier for the text display
   * @property {string} [content]
   * The content to dipslay
   */

  /**
   * @param {TextDisplayComponentOptions} [data={}] TextDisplayComponent to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'TEXT_DISPLAY' });

    /**
     * The ID of this text display
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * The content to display
     * @type {string}
     */
    this.content = data.content;
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {TextDisplayComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Transforms the text display to a plain object.
   * @returns {APIMessageComponent} The raw data of this text display
   */
  toJSON() {
    return {
      content: this.content,
      type: MessageComponentTypes[this.type],
      id: this.id ?? undefined,
    };
  }
}

module.exports = TextDisplayComponent;

/**
 * @external APIMessageComponent
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object}
 */
