import { Client, Events, GatewayIntentBits } from "discord.js";
import vuelnit from "@/core/vue";
import dotenv from "dotenv";
import { useAppStore } from "@/store/app"

import { loadCommands, loadEvent } from "@/core/loader";

vuelnit()
dotenv.config()

loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore()
appStore.client = client

loadEvent()

client.login(process.env.TOKEN);
