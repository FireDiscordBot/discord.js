'use strict';

const MessageComponentInteraction = require('./MessageComponentInteraction');

/**
 * Represents a select menu interaction.
 * @extends {MessageComponentInteraction}
 */
class SelectMenuInteraction extends MessageComponentInteraction {
  constructor(client, data) {
    super(client, data);

    /**
     * The raw values selected, if the component which was interacted with was a select menu
     * Will contain snowflakes for user, role, and mentionable select menus
     * @type {string[]}
     */
    this.values = data.data.values ?? [];

    /**
     * The interaction resolved data
     * @name CommandInteractionOptionResolver#resolved
     * @type {Readonly<CommandInteractionResolvedData>}
     */
    Object.defineProperty(this, 'resolved', { value: Object.freeze(this.transformResolved(data.data.resolved)) });
  }
}

module.exports = SelectMenuInteraction;
