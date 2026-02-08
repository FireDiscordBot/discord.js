'use strict';

const Action = require('./Action');
const { deletedChannels } = require('../../structures/Channel');
const { deletedMessages } = require('../../structures/Message');
const { Events } = require('../../util/Constants');

class ThreadDeleteAction extends Action {
  handle(data) {
    const client = this.client;
    const thread = client.channels.cache.get(data.id);

    if (thread) {
      client.channels._remove(thread.id);
      const deletedAt = Date.now();
      deletedChannels.set(thread.id, deletedAt);
      for (const message of thread.messages.cache.values()) {
        deletedMessages.set(message, deletedAt);
      }

      /**
       * Emitted whenever a thread is deleted.
       * @event Client#threadDelete
       * @param {ThreadChannel} thread The thread that was deleted
       */
      client.emit(Events.THREAD_DELETE, thread);
    }

    return { thread };
  }
}

module.exports = ThreadDeleteAction;
