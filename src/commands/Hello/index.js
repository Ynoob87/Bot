import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("打招呼")
  .setDescription("機器人會跟你打招呼 :D");

export const action = async (ctx) => {
  ctx.reply("你好 :D");
};
