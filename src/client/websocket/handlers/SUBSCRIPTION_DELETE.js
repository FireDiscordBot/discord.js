'use strict';

module.exports = (client, { d: data }) => {
  client.actions.SubscriptionDelete.handle(data);
};
