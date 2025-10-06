'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { MessageComponentTypes } = require('../util/Constants');
const Util = require('../util/Util');

/**
 * Represents a container containing message components.
 * @extends {BaseMessageComponentV2}
 */
class ContainerComponent extends BaseMessageComponentV2 {
  /**
   * Components that can be placed in a container
   * * MessageActionRow
   * * TextDiplayComponent
   * * SectionComponent
   * * MediaGalleryComponent
   * * SeparatorComponent
   * * FileComponent
   * @typedef {
   * MessageActionRow |
   * TextDisplayComponent |
   * SectionComponent |
   * MediaGalleryComponent |
   * SeparatorComponent |
   * FileComponent
   * } ContainerChildComponents
   */

  /**
   * Options for components that can be placed in a container.
   * * MessageActionRowOptions
   * * TextDisplayComponentOptions
   * * SectionComponentOptions
   * * MediaGalleryComponentOptions
   * * SeparatorComponentOptions
   * * FileComponentOptions
   * * @typedef {
   * MessageActionRowOptions |
   * TextDisplayComponentOptions |
   * SectionComponentOptions |
   * MediaGalleryComponentOptions |
   * SeparatorComponentOptions |
   * FileComponentOptions
   * } ContainerChildComponentOptions
   */

  /**
   * Data that can be resolved into components that can be placed in a container
   * * ContainerChildComponents
   * * ContainerChildComponentOptions
   * @typedef {ContainerChildComponents|ContainerChildComponentOptions} ContainerChildComponentResolvable
   */

  /**
   * @typedef {BaseMessageComponentOptions} ContainerComponentOptions
   * @property {number} [id]
   * Identifier for the container
   * @property {ContainerChildComponentResolvable[]} [components]
   * The components to place in this container
   * @property {ColorResolvable} [color]
   * The color of this container
   * @property {boolean} [spoiler]
   * Whether the container should be a spoiler (or blurred out)
   */

  /**
   * @param {ContainerComponent|ContainerComponentOptions} [data={}] ContainerComponent to clone or raw data
   * @param {Client} [client] The client constructing this ContainerComponent, if provided
   */
  constructor(data = {}, client = null) {
    super({ type: 'CONTAINER' });

    /**
     * The ID of this container
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * The components in this section
     * @type {SectionChildComponents[]}
     */
    this.components = data.components?.map(c => BaseMessageComponentV2.create(c, client)) ?? [];

    /**
     * The color of this container
     * @type {?number}
     */
    this.color = 'accent_color' in data ? Util.resolveColor(data.accent_color) : null;

    /**
     * Whether or not the container is spoilered
     * @type {boolean}
     */
    this.spoiler = data.spoiler ?? false;
  }

  /**
   * The hexadecimal version of the container color, with a leading hash
   * @type {?string}
   * @readonly
   */
  get hexColor() {
    return this.color ? `#${this.color.toString(16).padStart(6, '0')}` : null;
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {ContainerComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Adds components to the container.
   * @param {...ContainerChildComponentResolvable[]} components The components to add
   * @returns {ContainerComponent}
   */
  addComponents(...components) {
    this.components.push(...components.flat(Infinity).map(c => BaseMessageComponentV2.create(c)));
    return this;
  }

  /**
   * Sets the components of the container.
   * @param {...ContainerChildComponentResolvable[]} components The components to set
   * @returns {ContainerComponent}
   */
  setComponents(...components) {
    this.spliceComponents(0, this.components.length, components);
    return this;
  }

  /**
   * Removes, replaces, and inserts components in the container.
   * @param {number} index The index to start at
   * @param {number} deleteCount The number of components to remove
   * @param {...ContainerChildComponentResolvable[]} [components] The replacing components
   * @returns {ContainerComponent}
   */
  spliceComponents(index, deleteCount, ...components) {
    this.components.splice(index, deleteCount, ...components.flat(Infinity).map(c => BaseMessageComponentV2.create(c)));
    return this;
  }

  /**
   * Sets the color of this container.
   * @param {ColorResolvable} color The color of the container
   * @returns {ContainerComponent}
   */
  setColor(color) {
    this.color = Util.resolveColor(color);
    return this;
  }

  /**
   * Sets whether the container should be spoilered
   * @param {boolean} [spoilered=false] Whether or not the media is spoilered
   * @returns {ContainerComponent}
   */
  setSpoiler(spoilered = false) {
    this.spoiler = spoilered;
    return this;
  }

  /**
   * Transforms the container to a plain object.
   * @returns {APIMessageComponent} The raw data of this container
   */
  toJSON() {
    return {
      components: this.components.map(c => c.toJSON()),
      accent_color: this.color,
      spoiler: this.spoiler,
      type: MessageComponentTypes[this.type],
      id: this.id ?? undefined,
    };
  }
}

module.exports = ContainerComponent;

/**
 * @external APIMessageComponent
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object}
 */
