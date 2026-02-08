'use strict';

const Action = require('./Action');
const { deletedStageInstances } = require('../../structures/StageInstance');
const { Events } = require('../../util/Constants');

class StageInstanceUpdateAction extends Action {
  handle(data) {
    const client = this.client;
    const channel = this.getChannel(data);

    if (channel && !deletedStageInstances.has(data.id)) {
      const oldStageInstance = channel.guild.stageInstances.cache.get(data.id)?._clone() ?? null;
      const newStageInstance = channel.guild.stageInstances._add(data);

      /**
       * Emitted whenever a stage instance gets updated - e.g. change in topic or privacy level
       * @event Client#stageInstanceUpdate
       * @param {?StageInstance} oldStageInstance The stage instance before the update
       * @param {StageInstance} newStageInstance The stage instance after the update
       */
      client.emit(Events.STAGE_INSTANCE_UPDATE, oldStageInstance, newStageInstance);

      return { oldStageInstance, newStageInstance };
    }

    return {};
  }
}

module.exports = StageInstanceUpdateAction;
