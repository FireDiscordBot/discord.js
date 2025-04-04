'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class MessagePollVoteAddAction extends Action {
  handle(data) {
    const channel = this.getChannel(data);
    if (!channel?.isTextBased()) return false;

    const message = this.getMessage(data, channel);
    if (!message) return false;

    const { poll } = message;

    const answer = poll?.answers.get(data.answer_id);
    if (!answer) return false;

    answer.voteCount++;

    /**
     * Emitted whenever a user votes in a poll.
     * @event Client#messagePollVoteAdd
     * @param {PollAnswer} pollAnswer The answer that was voted on
     * @param {Snowflake} userId The id of the user that voted
     */
    this.client.emit(Events.MESSAGE_POLL_VOTE_ADD, answer, data.user_id);

    return { poll };
  }
}

module.exports = MessagePollVoteAddAction;
