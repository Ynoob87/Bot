import { SlashCommandBuilder } from "discord.js";

const commands = new SlashCommandBuilder()
    .setName("PING")
    .setDescription("idk")

    export const action = async(data) => {
        await data.reply("早安")
    }