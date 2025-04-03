'use strict';

const BitField = require('./BitField');

/**
 * Data structure that makes it easy to interact with an {@link GuildMember#flags} bitfield.
 * @extends {BitField}
 */
class GuildMemberFlags extends BitField {}

/**
 * @name GuildMemberFlags
 * @kind constructor
 * @memberof GuildMemberFlags
 * @param {BitFieldResolvable} [bits=0] Bit(s) to read from
 */

/**
 * Numeric guild member flags. All available properties:
 * * `DID_REJOIN`
 * * `COMPLETED_ONBOARDING`
 * * `BYPASSES_VERIFICATION`
 * * `STARTED_ONBOARDING`
 * * `IS_GUEST`
 * * `STARTED_SERVER_GUIDE`
 * * `COMPLETED_SERVER_GUIDE`
 * * `AUTOMOD_QUARANTINED_NAME`
 * * `AUTOMOD_QUARANTINED_BIO`
 * * `DM_SETTINGS_UPSELL_ACKNOWLEDGED`
 * * `AUTOMOD_QUARANTINED_CLAN_TAG`
 * @type {Object}
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags}
 */
GuildMemberFlags.FLAGS = {
  DID_REJOIN: 1 << 0,
  COMPLETED_ONBOARDING: 1 << 1,
  BYPASSES_VERIFICATION: 1 << 2,
  STARTED_ONBOARDING: 1 << 3,
  IS_GUEST: 1 << 4,
  STARTED_SERVER_GUIDE: 1 << 5,
  COMPLETED_SERVER_GUIDE: 1 << 6,
  AUTOMOD_QUARANTINED_NAME: 1 << 7,
  AUTOMOD_QUARANTINED_BIO: 1 << 8,
  DM_SETTINGS_UPSELL_ACKNOWLEDGED: 1 << 9,
  AUTOMOD_QUARANTINED_CLAN_TAG: 1 << 10,
};

/**
 * Data that can be resolved to give a guild member flag bitfield. This can be:
 * * A string (see {@link GuildMemberFlags.FLAGS})
 * * A guild member flag
 * * An instance of GuildMemberFlags
 * * An Array of GuildMemberFlagsResolvable
 * @typedef {string|number|GuildMemberFlags|GuildMemberFlagsResolvable[]} GuildMemberFlagsResolvable
 */

module.exports = GuildMemberFlags;
