import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("測試")
  .setDescription("指令2");

export const action = async (ctx) => {
  ctx.reply("你好");
};
