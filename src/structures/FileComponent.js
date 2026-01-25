'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { MessageComponentTypes } = require('../util/Constants');

/**
 * Represents a file.
 * @extends {BaseMessageComponentV2}
 */
class FileComponent extends BaseMessageComponentV2 {
  /**
   * @typedef {UnfurledMediaItem}
   * @property {string} [url]
   * Supports ONLY `attachment://<filename>` references
   * @property {string} [proxy_url]
   * The proxied url of the media item. This field is ignored and provided by the API as part of the response
   * @property {?number} [height]
   * The height of the media item. This field is ignored and provided by the API as part of the response
   * @property {?number} [width]
   * The width of the media item. This field is ignored and provided by the API as part of the response
   * @property {string} [content_type]
   * The media type of the content. This field is ignored and provided by the API as part of the response
   * @property {string} [attachment_id]
   * The id of the uploaded attachment. This field is ignored and provided by the API as part of the response
   */

  /**
   * @typedef {BaseMessageComponentOptions} FileComponentOptions
   * @property {number} [id]
   * Identifier for the file
   * @property {UnfurledMediaItem} [file]
   * The file to dipslay
   * @property {boolean} [spoiler]
   * Whether the file should be a spoiler (or blurred out)
   * @property {string} [name]
   * The name of the file. This field is ignored and provided by the API as part of the response
   * @property {number} [size]
   * The size of the file in bytes. This field is ignored and provided by the API as part of the response
   */

  /**
   * @param {FileComponentOptions} [data={}] FileComponent to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'FILE' });

    /**
     * The ID of this file
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * The file to display in the component
     * @type {UnfurledMediaItem}
     */
    this.file = data.file;

    /**
     * Whether or not the media is spoilered
     * @type {boolean}
     */
    this.spoiler = data.spoiler ?? false;

    /**
     * The name of the file
     * @type {string}
     */
    this.name = data.name;

    /**
     * The size of the file in bytes
     * @type {nunber}
     */
    this.size = data.size;
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {FileComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Sets the file for this component
   * @param {string} name The name of the attachment to display
   * @returns {FileComponent}
   */
  setFile(name) {
    this.name = name;
    this.file = { url: `attachment://${name}` };
    return this;
  }

  /**
   * Sets whether the file should be spoilered
   * @param {boolean} [spoilered=false] Whether or not the file is spoilered
   * @returns {FileComponent}
   */
  setSpoiler(spoilered = false) {
    this.spoiler = spoilered;
    return this;
  }

  /**
   * Transforms the file to a plain object.
   * @returns {APIMessageComponent} The raw data of this file
   */
  toJSON() {
    return {
      file: this.file,
      spoiler: this.spoiler,
      type: MessageComponentTypes[this.type],
      id: this.id ?? undefined,
    };
  }
}

module.exports = FileComponent;

/**
 * @external APIMessageComponent
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object}
 */
