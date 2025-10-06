'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { MessageComponentTypes } = require('../util/Constants');

/**
 * Represents a section containing message components and an accessory.
 * @extends {BaseMessageComponentV2}
 */
class SectionComponent extends BaseMessageComponentV2 {
  /**
   * Components that can be placed in an section
   * * TextDisplayComponent
   * @typedef {TextDisplayComponent} SectionChildComponents
   */

  /**
   * Options for components that can be placed in a section
   * * TextDisplayComponentOptions
   * @typedef {TextDisplayComponentOptions} SectionChildComponentOptions
   */

  /**
   * Accessory components that can be placed within a section
   * * MessageButton
   * * ThumbnailComponent
   * @typedef {MessageButton|ThumbnailComponent} SectionAccessoryComponents
   */

  /**
   * Options for accessories that can be placed within a section
   * * MessageButtonOptions
   * * ThumbnailComponentOptions
   * @typedef {MessageButtonOptions|ThumbnailComponentOptions} SectionAccessoryComponentOptions
   */

  /**
   * Data that can be resolved into components that can be placed in a section
   * * SectionChildComponents
   * * SectionChildComponentOptions
   * @typedef {SectionChildComponents|SectionChildComponentOptions} SectionChildComponentResolvable
   */

  /**
   * Data that can be resolved into an accessory that can be placed in a section
   * * SectionAccessoryComponents
   * * SectionAccessoryComponentOptions
   * @typedef {SectionAccessoryComponents|SectionAccessoryComponentOptions} SectionAccessoryComponentResolvable
   */

  /**
   * @typedef {BaseMessageComponentOptions} SectionComponentOptions
   * @property {number} [id]
   * Identifier for the section
   * @property {SectionChildComponentResolvable[]} [components]
   * The components to place in this section
   * @property {SectionAccessoryComponentResolvable} [accessory]
   * The accessory to this section
   */

  /**
   * @param {SectionComponent|SectionComponentOptions} [data={}] SectionComponent to clone or raw data
   * @param {Client} [client] The client constructing this SectionComponent, if provided
   */
  constructor(data = {}, client = null) {
    super({ type: 'SECTION' });

    /**
     * The ID of this section
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * The components in this section
     * @type {SectionChildComponents[]}
     */
    this.components = data.components?.map(c => BaseMessageComponentV2.create(c, client)) ?? [];

    /**
     * The accessory of this section
     * @type {SectionAccessoryComponents}
     */
    this.accessory = data.accessory ? BaseMessageComponentV2.create(data.accessory, client) : undefined;
  }

  /**
   * Sets the unique identifier for this component
   * @param {number} id A unique integer to identify the component in messages & interactions
   * @returns {SectionComponent}
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Adds components to the section.
   * @param {...SectionChildComponentResolvable[]} components The components to add
   * @returns {SectionComponent}
   */
  addComponents(...components) {
    this.components.push(...components.flat(Infinity).map(c => BaseMessageComponentV2.create(c)));
    return this;
  }

  /**
   * Sets the components of the section.
   * @param {...SectionChildComponentResolvable[]} components The components to set
   * @returns {SectionComponent}
   */
  setComponents(...components) {
    this.spliceComponents(0, this.components.length, components);
    return this;
  }

  /**
   * Removes, replaces, and inserts components in the section.
   * @param {number} index The index to start at
   * @param {number} deleteCount The number of components to remove
   * @param {...SectionChildComponentResolvable[]} [components] The replacing components
   * @returns {SectionComponent}
   */
  spliceComponents(index, deleteCount, ...components) {
    this.components.splice(index, deleteCount, ...components.flat(Infinity).map(c => BaseMessageComponentV2.create(c)));
    return this;
  }

  /**
   * Sets the accessory for this section
   * @param {SectionAccessoryComponentResolvable} accessory The accessory to set
   * @returns {SectionComponent}
   */
  setAccessory(accessory) {
    this.accessory = accessory ? BaseMessageComponentV2.create(accessory) : undefined;
    return this;
  }

  /**
   * Transforms the section to a plain object.
   * @returns {APIMessageComponent} The raw data of this section
   */
  toJSON() {
    return {
      components: this.components.map(c => c.toJSON()),
      accessory: this.accessory?.toJSON() ?? undefined,
      type: MessageComponentTypes[this.type],
      id: this.id ?? undefined,
    };
  }
}

module.exports = SectionComponent;

/**
 * @external APIMessageComponent
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object}
 */
