import { REST, Routes, Collection } from "discord.js";
import FastGlob, { async } from "fast-glob";
import { useAppStore } from "@/store/app"

const updateSlashCommands = async (commands) => {
  const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);
  const result = await
    rest.put(
      Routes.applicationCommands(
        process.env.APPLICATION_ID
      ),
      {
        body: commands,
      }
    );
  //console.log(result)
};

export async function loadCommands() {
  const appStore = useAppStore()
  const commands = []
  const actions = new Collection()
  const files = await FastGlob("./src/commands/**/index.js");

  for (const file of files) {
    const cmd = await import(file);
    commands.push(cmd.command);
    actions.set(cmd.command.name, cmd.action)
  }
  await updateSlashCommands(commands);
  appStore.commandsActionMap = actions

  console.log(appStore.commandsActionMap)
}

export const loadEvent = async () => {
  const appStore = useAppStore()
  const client = appStore.client
  const files = await FastGlob("./src/events/**/index.js")

  for (const file of files) {
    const eventfile = await import(file)

    if (eventfile.event.once) {
      client.once(eventfile.event.name,eventfile.action)
    }
    else {
      client.on(eventfile.event.name,eventfile.action)
    }
  }
}
//手寫API
/*const updateSlashCommands = () => {
  axias({
    method: "PUT",
    url: "https://discord.com/api/v10/applications/<my_application_id>/commands",
    headers: {
      Authorization: "Bot {botToken}",
    },
    data: {
      body: [{ name: "播放", Descripition: "撥放音樂" }],
    },
  });
};*/
