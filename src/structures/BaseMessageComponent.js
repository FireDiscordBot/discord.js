'use strict';

const { TypeError } = require('../errors');
const { MessageComponentTypes, Events } = require('../util/Constants');

/**
 * Represents an interactive component of a Message or Modal. It should not be necessary to construct this directly.
 * See {@link MessageComponent}
 */
class BaseMessageComponent {
  /**
   * Options for a BaseMessageComponent
   * @typedef {Object} BaseMessageComponentOptions
   * @property {MessageComponentTypeResolvable} type The type of this component
   */

  /**
   * Data that can be resolved into options for a component. This can be:
   * * MessageActionRowOptions
   * * MessageButtonOptions
   * * MessageSelectMenuOptions
   * * TextInputComponentOptions
   * @typedef {MessageActionRowOptions|MessageButtonOptions|MessageSelectMenuOptions} MessageComponentOptions
   */

  /**
   * Components that can be sent in a payload. These can be:
   * * MessageActionRow
   * * MessageButton
   * * BaseSelectMenu
   * * TextInputComponent
   * @typedef {MessageActionRow|MessageButton|BaseSelectMenu} MessageComponent
   * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
   */

  /**
   * Data that can be resolved to a MessageComponentType. This can be:
   * * MessageComponentType
   * * string
   * * number
   * @typedef {string|number|MessageComponentType} MessageComponentTypeResolvable
   */

  /**
   * @param {BaseMessageComponent|BaseMessageComponentOptions} [data={}] The options for this component
   */
  constructor(data) {
    /**
     * The type of this component
     * @type {?MessageComponentType}
     */
    this.type = 'type' in data ? BaseMessageComponent.resolveType(data.type) : null;
  }

  /**
   * Constructs a component based on the type of the incoming data
   * @param {MessageComponentOptions} data Data for a MessageComponent
   * @param {Client|WebhookClient} [client] Client constructing this component
   * @returns {?(MessageComponent|ModalComponent)}
   * @private
   */
  static create(data, client) {
    let component;
    let type = data.type;

    if (typeof type === 'string') type = MessageComponentTypes[type];

    switch (type) {
      case MessageComponentTypes.ACTION_ROW: {
        const MessageActionRow = require('./MessageActionRow');
        component = data instanceof MessageActionRow ? data : new MessageActionRow(data, client);
        break;
      }
      case MessageComponentTypes.BUTTON: {
        const MessageButton = require('./MessageButton');
        component = data instanceof MessageButton ? data : new MessageButton(data);
        break;
      }
      case MessageComponentTypes.SELECT_MENU: {
        const MessageSelectMenu = require('./MessageSelectMenu');
        component = data instanceof MessageSelectMenu ? data : new MessageSelectMenu(data);
        break;
      }
      case MessageComponentTypes.USER_SELECT: {
        const UserSelectMenu = require('./UserSelectMenu');
        component = data instanceof UserSelectMenu ? data : new UserSelectMenu(data);
        break;
      }
      case MessageComponentTypes.ROLE_SELECT: {
        const RoleSelectMenu = require('./RoleSelectMenu');
        component = data instanceof RoleSelectMenu ? data : new RoleSelectMenu(data);
        break;
      }
      case MessageComponentTypes.MENTIONABLE_SELECT: {
        const MentionableSelectMenu = require('./MentionableSelectMenu');
        component = data instanceof MentionableSelectMenu ? data : new MentionableSelectMenu(data);
        break;
      }
      case MessageComponentTypes.CHANNEL_SELECT: {
        const ChannelSelectMenu = require('./ChannelSelectMenu');
        component = data instanceof ChannelSelectMenu ? data : new ChannelSelectMenu(data);
        break;
      }
      case MessageComponentTypes.TEXT_INPUT: {
        const TextInputComponent = require('./TextInputComponent');
        component = data instanceof TextInputComponent ? data : new TextInputComponent(data);
        break;
      }
      case MessageComponentTypes.SECTION: {
        const SectionComponent = require('./SectionComponent');
        component = data instanceof SectionComponent ? data : new SectionComponent(data);
        break;
      }
      case MessageComponentTypes.TEXT_DISPLAY: {
        const TextDisplayComponent = require('./TextDisplayComponent');
        component = data instanceof TextDisplayComponent ? data : new TextDisplayComponent(data);
        break;
      }
      case MessageComponentTypes.THUMBNAIL: {
        const ThumbnailComponent = require('./ThumbnailComponent');
        component = data instanceof ThumbnailComponent ? data : new ThumbnailComponent(data);
        break;
      }
      case MessageComponentTypes.MEDIA_GALLERY: {
        const MediaGalleryComponent = require('./MediaGalleryComponent');
        component = data instanceof MediaGalleryComponent ? data : new MediaGalleryComponent(data);
        break;
      }
      case MessageComponentTypes.FILE: {
        const FileComponent = require('./FileComponent');
        component = data instanceof FileComponent ? data : new FileComponent(data);
        break;
      }
      case MessageComponentTypes.SEPARATOR: {
        const SeparatorComponent = require('./SeparatorComponent');
        component = data instanceof SeparatorComponent ? data : new SeparatorComponent(data);
        break;
      }
      case MessageComponentTypes.CONTAINER: {
        const ContainerComponent = require('./ContainerComponent');
        component = data instanceof ContainerComponent ? data : new ContainerComponent(data);
        break;
      }
      case MessageComponentTypes.LABEL: {
        const LabelComponent = require('./LabelComponent');
        component = data instanceof LabelComponent ? data : new LabelComponent(data);
        break;
      }
      case MessageComponentTypes.FILE_UPLOAD: {
        const FileUploadComponent = require('./FileUploadComponent');
        component = data instanceof FileUploadComponent ? data : new FileUploadComponent(data);
        break;
      }
      case MessageComponentTypes.RADIO_GROUP: {
        const RadioGroupComponent = require('./RadioGroupComponent');
        component = data instanceof RadioGroupComponent ? data : new RadioGroupComponent(data);
        break;
      }
      case MessageComponentTypes.CHECKBOX_GROUP: {
        const CheckboxGroupComponent = require('./CheckboxGroupComponent');
        component = data instanceof CheckboxGroupComponent ? data : new CheckboxGroupComponent(data);
        break;
      }
      case MessageComponentTypes.CHECKBOX: {
        const CheckboxComponent = require('./CheckboxComponent');
        component = data instanceof CheckboxComponent ? data : new CheckboxComponent(data);
        break;
      }
      default:
        if (client) {
          client.emit(Events.DEBUG, `[BaseMessageComponent] Received component with unknown type: ${data.type}`);
        } else {
          throw new TypeError('INVALID_TYPE', 'data.type', 'valid MessageComponentType');
        }
    }
    return component;
  }

  /**
   * Resolves the type of a component
   * @param {MessageComponentTypeResolvable} type The type to resolve
   * @returns {MessageComponentType}
   * @private
   */
  static resolveType(type) {
    return typeof type === 'string' ? type : MessageComponentTypes[type];
  }
}

module.exports = BaseMessageComponent;
