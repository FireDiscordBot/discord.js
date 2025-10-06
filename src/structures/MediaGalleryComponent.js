'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const MediaGalleryItem = require('./MediaGalleryItem');
const { MessageComponentTypes } = require('../util/Constants');

/**
 * Represents a gallery containing media items.
 * @extends {BaseMessageComponentV2}
 */
class MediaGalleryComponent extends BaseMessageComponentV2 {
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
   * @typedef {MediaGalleryItemOptions}
   * @property {UnfurledMediaItem} [media]
   * The item's media
   * @property {string} [description]
   * Alt text for the media, max 1024 characters
   * @property {boolean} [spoiler]
   * Whether the media should be a spoiler (or blurred out)
   */

  /**
   * Data that can be resolved into items that can be placed in a gallery
   * * MediaGalleryItem
   * * MediaGalleryItemOptions
   * @typedef {MediaGalleryItem|MediaGalleryItemOptions} MediaGalleryItemResolvable
   */

  /**
   * @typedef {BaseMessageComponentOptions} MediaGalleryComponentOptions
   * @property {number} [id]
   * Identifier for the media gallery
   * @property {MediaGalleryItemResolvable[]} [items]
   * The media items to place in this gallery
   */

  /**
   * @param {MediaGalleryComponent|MediaGalleryComponentOptions} [data={}] MediaGalleryComponent to clone or raw data
   */
  constructor(data = {}) {
    super({ type: 'MEDIA_GALLERY' });

    /**
     * The ID of this section
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * The items in this gallery
     * @type {MediaGalleryItem[]}
     */
    this.items = data.items?.map(i => MediaGalleryItem.create(i)) ?? [];
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {MediaGalleryComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Adds items to the gallery.
   * @param {...MediaGalleryItemResolvable[]} items The items to add
   * @returns {MediaGalleryComponent}
   */
  addItems(...items) {
    this.items.push(...items.flat(Infinity).map(i => MediaGalleryItem.create(i)));
    return this;
  }

  /**
   * Sets the items of the section.
   * @param {...MediaGalleryItemResolvable[]} items The items to set
   * @returns {MediaGalleryComponent}
   */
  setItems(...items) {
    this.spliceItems(0, this.items.length, items);
    return this;
  }

  /**
   * Removes, replaces, and inserts items in the section.
   * @param {number} index The index to start at
   * @param {number} deleteCount The number of components to remove
   * @param {...MediaGalleryItemResolvable[]} [items] The replacing items
   * @returns {MediaGalleryComponent}
   */
  spliceItems(index, deleteCount, ...items) {
    this.items.splice(index, deleteCount, ...items.flat(Infinity).map(i => BaseMessageComponentV2.create(i)));
    return this;
  }

  /**
   * Transforms the section to a plain object.
   * @returns {APIMessageComponent} The raw data of this section
   */
  toJSON() {
    return {
      items: this.items.map(i => i.toJSON()),
      type: MessageComponentTypes[this.type],
      id: this.id ?? undefined,
    };
  }
}

module.exports = MediaGalleryComponent;

/**
 * @external APIMessageComponent
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object}
 */
