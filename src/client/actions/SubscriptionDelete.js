'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class SubscriptionDeleteAction extends Action {
  handle(data) {
    const client = this.client;
    const subscription = client.application.subscriptions.cache.get(data.id);

    if (subscription) {
      client.application.subscriptions.cache.delete(data.id);

      /**
       * Emitted whenever a subscription is deleted.
       * @event Client#subscriptionDelete
       * @param {Subscription} subscription The subscription that was deleted
       */
      client.emit(Events.SUBSCRIPTION_DELETE, subscription);
    }

    return { subscription };
  }
}

module.exports = SubscriptionDeleteAction;
