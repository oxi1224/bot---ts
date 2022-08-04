import { Snowflake } from "discord.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class GuildConfig extends Model {
  /**
   * Id of the guild.
   */
  declare id: Snowflake;

  /**
   * Muted role of the guild.
   */
  declare mutedRole: Snowflake;

  /**
   * Prefix for the guild.
   */
  declare prefix: string;

  /**
   * Channels in which commands can be executed.
   */
  declare commandChannels: Snowflake[];

  /**
   * Automod immune users.
   */
  declare automodImmune: Snowflake[];

  /**
   * Channels to close when running the lockdown command.
   */
  declare lockdownChannels: Snowflake[];

  /**
   * Channels to which info will be logged.
   */
  declare loggingChannels: { [key: string]: Snowflake };

  public static initialize(sequelize: Sequelize) {
    GuildConfig.init({
      id: { type: DataTypes.STRING, primaryKey: true },
      mutedRole: { type: DataTypes.STRING, allowNull: true },
      prefix: { type: DataTypes.STRING, allowNull: false, defaultValue: '!' },
      commandChannels: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, defaultValue: [] },
      automodImmune: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, defaultValue: [] },
      lockdownChannels: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true, defaultValue: [] },
      loggingChannels: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} }
    }, { sequelize });
  }
}

export interface GuildConfigModel {
  id: Snowflake,
  mutedRole: Snowflake,
  prefix: string,
  commandChannels: Snowflake[],
  automodImmune: Snowflake[],
  lockdownChannels: Snowflake[],
  loggingChannels: { [key: string]: Snowflake },
}
export const validConfigKeys: string[] = ['mutedRole', 'prefix', 'modlogsChannel', 'actionsChannel', 'commandChannels', 'automodImmune', 'lockdownChannels'];
export const guildConfigKeysMap: Map<string, string> = (() => {
  const map: Map<string, string> = new Map();
  validConfigKeys.forEach(key => {
    map.set(key.toLowerCase(), key);
    map.set(key, key);
  });
  return map;
})();
export type GuildConfigModelKey = typeof validConfigKeys[number]