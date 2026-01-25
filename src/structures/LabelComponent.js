'use strict';

const BaseMessageComponentV2 = require('./BaseMessageComponentV2');
const { MessageComponentTypes } = require('../util/Constants');

/**
 * Represents a label containing a message component and description.
 * @extends {BaseMessageComponentV2}
 */
class LabelComponent extends BaseMessageComponentV2 {
  /**
   * Components that can be placed within a label
   * * TextInputComponent
   * * MessageSelectMenu
   * * UserSelectMenu
   * * RoleSelectMenu
   * * MentionableSelectMenu
   * * ChannelSelectMenu
   * * RadioGroupComponent
   * * CheckboxGroupComponent
   * * CheckboxComponent
   * @typedef {
   * TextInputComponent |
   * MessageSelectMenu |
   * UserSelectMenu |
   * RoleSelectMenu |
   * MentionableSelectMenu |
   * ChannelSelectMenu |
   * RadioGroupComponent |
   * CheckboxGroupComponent |
   * CheckboxComponent
   * } LabelChildComponents
   */

  /**
   * Options for a component that can be placed within a label.
   * * MessageActionRowOptions
   * * TextDisplayComponentOptions
   * * SectionComponentOptions
   * * MediaGalleryComponentOptions
   * * SeparatorComponentOptions
   * * FileComponentOptions
   * * RadioGroupComponentOptions
   * * CheckboxGroupComponentOptions
   * * CheckboxComponentOptions
   * @typedef {
   * TextInputComponentOptions |
   * MessageSelectMenuOptions |
   * UserSelectMenuOptions |
   * RoleSelectMenuOptions |
   * MentionableSelectMenuOptions |
   * ChannelSelectMenuOptions |
   * RadioGroupComponentOptions |
   * CheckboxGroupComponentOptions |
   * CheckboxComponentOptions
   * } LabelChildComponentOptions
   */

  /**
   * Data that can be resolved into a component that can be placed within a label
   * * LabelChildComponents
   * * LabelChildComponentOptions
   * @typedef {LabelChildComponents|LabelChildComponentOptions} LabelChildComponentResolvable
   */

  /**
   * @typedef {BaseMessageComponentOptions} LabelComponentOptions
   * @property {number} [id]
   * Identifier for the section
   * @property {string} [label]
   * The label text; max 45 characters
   * @property {string} [description]
   * 	An optional description text for the label; max 100 characters
   * @property {LabelChildComponentResolvable} [component]
   * The component within the label
   */

  /**
   * @param {LabelComponent|LabelComponentOptions} [data={}] LabelComponent to clone or raw data
   * @param {Client} [client] The client constructing this LabelComponent, if provided
   */
  constructor(data = {}, client = null) {
    super({ type: 'LABEL' });

    /**
     * The ID of this section
     * @type {number}
     */
    this.id = data.id ?? undefined;

    /**
     * The label text
     * @type {string}
     */
    this.label = data.label;

    /**
     * The description of the label
     * @type {string}
     */
    this.description = data.description;

    /**
     * The component within this label
     * @type {LabelChildComponents}
     */
    this.component = data.component ? BaseMessageComponentV2.create(data.component, client) : undefined;
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
   * Sets the label text for this component
   * @param {string} label The label text to use
   * @returns {LabelComponent}
   */
  setLabel(label) {
    this.label = label;
    return this;
  }

  /**
   * Sets the description text for this component
   * @param {string} description The description text to use
   * @returns {LabelComponent}
   */
  setDescription(description) {
    this.description = description;
    return this;
  }

  /**
   * Sets the component for this label
   * @param {LabelChildComponentResolvable} component The label to set
   * @returns {LabelComponent}
   */
  setComponent(component) {
    this.component = component ? BaseMessageComponentV2.create(component) : undefined;
    return this;
  }

  /**
   * Transforms the label to a plain object.
   * @returns {APIMessageComponent} The raw data of this label
   */
  toJSON() {
    return {
      component: this.component?.toJSON() ?? undefined,
      label: this.label,
      description: this.description,
      type: MessageComponentTypes[this.type],
      id: this.id ?? undefined,
    };
  }
}

module.exports = LabelComponent;

/**
 * @external APIMessageComponent
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object}
 */
