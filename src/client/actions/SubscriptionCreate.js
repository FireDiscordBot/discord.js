'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class SubscriptionCreateAction extends Action {
  handle(data) {
    const client = this.client;
    const subscription = client.application.subscriptions._add(data);

    /**
     * Emitted whenever a subscription is created.
     * @event Client#subscriptionCreate
     * @param {Subscription} subscription The subscription that was created
     */
    client.emit(Events.SUBSCRIPTION_CREATE, subscription);

    return { subscription };
  }
}

module.exports = SubscriptionCreateAction;
