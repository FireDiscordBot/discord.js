'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class EntitlementDeleteAction extends Action {
  handle(data) {
    const client = this.client;
    const entitlement = client.application.entitlements.cache.get(data.id);

    if (entitlement) {
      entitlement.deleted = true;
      client.application.entitlements.cache.delete(data.id);

      /**
       * Emitted whenever an entitlement is deleted.
       * @event Client#entitlementDelete
       * @param {Entitlement} entitlement The entitlement that was deleted
       */
      client.emit(Events.ENTITLEMENT_DELETE, entitlement);
    }

    return { entitlement };
  }
}

module.exports = EntitlementDeleteAction;
