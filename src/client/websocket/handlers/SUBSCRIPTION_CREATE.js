'use strict';

module.exports = (client, { d: data }) => {
  client.actions.SubscriptionCreate.handle(data);
};
