'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { MessageComponentTypes } = require('../util/Constants');

/**
 * Represents a thumbnail.
 * @extends {BaseMessageComponentV2}
 */
class ThumbnailComponent extends BaseMessageComponentV2 {
  /**
   * @typedef {UnfurledMediaItem}
   * @property {string} [url]
   * Supports arbitrary urls and `attachment://<filename>` references
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
   * @typedef {BaseMessageComponentOptions} ThumbnailComponentOptions
   * @property {number} [id]
   * Identifier for the thumbnail
   * @property {UnfurledMediaItem} [media]
   * The media to dipslay
   * @property {string} [description]
   * Alt text for the media, max 1024 characters
   * @property {boolean} [spoiler]
   * Whether the thumbnail should be a spoiler (or blurred out)
   */

  /**
   * @param {ThumbnailComponentOptions} [data={}] ThumbnailComponent to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'THUMBNAIL' });

    /**
     * The ID of this thumbnail
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * The media to display in the thumbnail
     * @type {UnfurledMediaItem}
     */
    this.media = data.media;

    /**
     * The description/alt text of the media
     * @type {string}
     */
    this.description = data.description;

    /**
     * Whether or not the media is spoilered
     * @type {boolean}
     */
    this.spoiler = data.spoiler ?? false;
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {ThumbnailComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Sets the media for this thumbnail
   * @param {string} url The URL of the media to display
   * @returns {ThumbnailComponent}
   */
  setMedia(url) {
    this.media = { url };
    return this;
  }

  /**
   * Sets the description for this thumbnail
   * @param {string} description The alt text for the media
   * @returns {ThumbnailComponent}
   */
  setDescription(description) {
    this.description = description;
    return this;
  }

  /**
   * Sets whether the media should be spoilered
   * @param {boolean} [spoilered=false] Whether or not the media is spoilered
   * @returns {ThumbnailComponent}
   */
  setSpoiler(spoilered = false) {
    this.spoiler = spoilered;
    return this;
  }

  /**
   * Transforms the thumbnail to a plain object.
   * @returns {APIMessageComponent} The raw data of this thumbnail
   */
  toJSON() {
    return {
      media: this.media,
      spoiler: this.spoiler,
      description: this.description,
      type: MessageComponentTypes[this.type],
      id: this.id ?? undefined,
    };
  }
}

module.exports = ThumbnailComponent;

/**
 * @external APIMessageComponent
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object}
 */
