'use strict';

/**
 * Represents a media gallery item, to be used within the media gallery component
 */
class MediaGalleryItem {
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
   * @typedef MediaGalleryItemOptions
   * @property {UnfurledMediaItem} [media]
   * The item's media
   * @property {string} [description]
   * Alt text for the media, max 1024 characters
   * @property {boolean} [spoiler]
   * Whether the media should be a spoiler (or blurred out)
   */

  /**
   * @param {MediaGalleryItem|MediaGalleryItemOptions} [data={}] MediaGalleryItem to clone or raw data
   */
  constructor(data = {}) {
    /**
     * The media to display in the item
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
   * Sets the media for this thumbnail
   * @param {string} url The URL of the media to display
   * @returns {MediaGalleryItem}
   */
  setMedia(url) {
    this.media = { url };
    return this;
  }

  /**
   * Sets the description for this thumbnail
   * @param {string} description The alt text for the media
   * @returns {MediaGalleryItem}
   */
  setDescription(description) {
    this.description = description;
    return this;
  }

  /**
   * Sets whether the media should be spoilered
   * @param {boolean} [spoilered=false] Whether or not the media is spoilered
   * @returns {MediaGalleryItem}
   */
  setSpoiler(spoilered = false) {
    this.spoiler = spoilered;
    return this;
  }

  /**
   * Transforms the item to a plain object.
   * @returns {APIMediaGalleryItem} The raw data of this item
   */
  toJSON() {
    return {
      media: this.media,
      spoiler: this.spoiler,
      description: this.description,
    };
  }

  /**
   * Constructs a media gallery item
   * @param {MediaGalleryItemOptions} data Data for a media gallery item
   * @returns {MediaGalleryItem}
   */
  static create(data) {
    if (data instanceof MediaGalleryItem) return data;
    else return new MediaGalleryItem(data);
  }
}

module.exports = MediaGalleryItem;

/**
 * @external APIMediaGalleryItem
 * @see {@link https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-item-structure}
 */
