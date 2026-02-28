'use strict';

module.exports = (client, { d: data }) => {
  client.actions.SubscriptionUpdate.handle(data);
};
