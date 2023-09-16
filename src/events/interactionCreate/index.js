import { Events } from "discord.js"
import { useAppStore } from "@/store/app";

export const event = {
    name: Events.InteractionCreate,
    once: false
}

export const action = (interaction) => {
    if (!interaction.isChatInputCommand()) return
    const appStore = useAppStore()
    const action = appStore.commandsActionMap.get(interaction.commandName)

    action(interaction);
}