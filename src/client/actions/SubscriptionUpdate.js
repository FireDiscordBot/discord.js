'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class SubscriptionUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    const oldSubscription = client.application.subscriptions.cache.get(data.id)?._clone() ?? null;
    const newSubscription = client.application.subscriptions._add(data);

    /**
     * Emitted whenever a subscription is updated.
     * @event Client#subscriptionUpdate
     * @param {?Subscription} oldSubscription The subscription before the update
     * @param {Subscription} newSubscription The subscription after the update
     */
    client.emit(Events.SUBSCRIPTION_UPDATE, oldSubscription, newSubscription);

    return { oldSubscription, newSubscription };
  }
}

module.exports = SubscriptionUpdateAction;
