![banner](https://i.imgur.com/HT7Wmv1.jpg)

[![discord](https://img.shields.io/discord/730998659008823296.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/mhj3Zsv)
[![ci-build-status](https://img.shields.io/github/workflow/status/moonstar-x/discord-tts-bot/CI?logo=github)](https://github.com/moonstar-x/discord-tts-bot)
[![open-issues-count](https://img.shields.io/github/issues-raw/moonstar-x/discord-tts-bot?logo=github)](https://github.com/moonstar-x/discord-tts-bot)
[![docker-image-size](https://img.shields.io/docker/image-size/moonstarx/discord-tts-bot?logo=docker)](https://hub.docker.com/repository/docker/moonstarx/discord-tts-bot)
[![docker-pulls](https://img.shields.io/docker/pulls/moonstarx/discord-tts-bot?logo=docker)](https://hub.docker.com/repository/docker/moonstarx/discord-tts-bot)
[![ko-fi](https://img.shields.io/badge/buy%20me%20a%20coffee-%E2%98%95%20%20-%23ff5f5f)](https://ko-fi.com/moonstar_x)

# Discord TTS Bot

This is a simple TTS Bot that uses the Google Translate TTS API. With this bot you can send Text-to-Speech messages in multiple languages using Google Translate or other TTS engines.

## Requirements

To self-host this bot you'll need the following:

* [git](https://git-scm.com/)
* [node.js](https://nodejs.org/en/) (Version 16.6.0 or higher)
* ffmpeg

**ffmpeg** should be installed by default on Linux and MacOS, in case it isn't, install it with your package manager. For Windows users, head over to [ffmpeg's official website](https://www.ffmpeg.org/download.html#build-windows) to download the binary which will need to be added to your **\$PATH**. If you don't know how to add folders to your **\$PATH**, check out this [guide](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/).

You may also try installing it with:

```text
npm install ffmpeg-static
```

## Installation

In order to self-host this bot, first you'll need to clone this repository.

```text
git clone https://github.com/moonstar-x/discord-tts-bot.git
```

Install the dependencies with:

```text
npm ci --only=prod
```

Or, if you want to also install the `devDependencies`:

```text
npm install
```

After you have [configured](#configuration) the bot, you should deploy the slash commands by running:

```text
npm run deploy
```

Then, you can run your bot with:

```text
npm start
```

In case your bot is in a lot of servers (more than 2000), you should shard your bot. You can start a sharded client with:

```text
npm run start-sharded
```

## Updating

In order to update this bot, you should pull the latest changes:

```text
git pull origin master
```

And re-install the dependencies:

```text
rm -rf node_modules && npm install
```

Once this is done, you should re-deploy the commands:

```text
npm run deploy
```

And you're ready to go. Make sure you check the README everytime you wish to update in case there are breaking changes
that may affect your current installation.

## Creating your Bot Token

Head over to [Discord Application Page](https://discord.com/developers/applications/) and create a new bot. Then, you should enable it as a bot
by going into the `Bot` page and setting up your bot. Then, you should head over to the `OAuth2` page and select `OAuth2 URL Generator`. A box should show up
with plenty of checkboxes, enable the `bot` and `application.commands` checkboxes. Then, another box should show up with more checkboxes, enable the following ones:

* Send Messages
* Read Message History
* Connect
* Speak

At the bottom a link should show up, access this link to invite your bot. You should send this link to anyone that wishes to add your bot to their Discord server.

## Configuration

Inside the `config` folder, rename the file *settings.json.example* to *settings.json* and edit the file with your own Discord Token and other settings. If you don't have a discord token yet, you can see a guide on how to create it [here](https://github.com/moonstar-x/discord-downtime-notifier/wiki).

Your file should look like this.

```json
{
  "token": "YOUR_DISCORD_TOKEN",
  "prefix": "$",
  "owner_id": "123123123",
  "owner_reporting": false,
  "presence_refresh_interval": 600000,
  "default_disconnect_timeout": 5,
  "testing_guild_id": null,
  "provider_type": "level",
  "redis_url": "redis://ip:port",
  "enable_tts_channels": false
}
```

You may also configure these options with environment variables. The settings set with the environment variables will take higher precedence than the ones in the config JSON file.

This table contains all the configuration settings you may specify with both environment variables and the JSON config file.

| Environment Variable               | JSON Property                | Required                    | Type                       | Description                                                                                                                                                                                                                                                                                                                    |
|------------------------------------|------------------------------|-----------------------------|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DISCORD_TOKEN                      | `token`                      | Yes.                        | `string`                   | The bot's token.                                                                                                                                                                                                                                                                                                               |
| DISCORD_PREFIX                     | `prefix`                     | No. (Defaults to: `$`)      | `string`                   | **Deprecated**: The bot's prefix. A prefix is no longer necessary because this bot uses the all new interactions (slash commands).                                                                                                                                                                                             |
| DISCORD_OWNER_ID                   | `owner_id`                   | No. (Defaults to: `null`)   | `string` or `null`         | The ID of the bot's owner.                                                                                                                                                                                                                                                                                                     |
| DISCORD_OWNER_REPORTING            | `owner_reporting`            | No. (Defaults to: `false`)  | `boolean`                  | Whether the bot should send error reports to the owner via DM when a command errors.                                                                                                                                                                                                                                           |
| DISCORD_PRESENCE_REFRESH_INTERVAL  | `presence_refresh_interval`  | No. (Defaults to: `900000`) | `number` or `null`         | The time interval in milliseconds in which the bot updates its presence. If set to `null` the presence auto update will be disabled.                                                                                                                                                                                           |
| DISCORD_DEFAULT_DISCONNECT_TIMEOUT | `default_disconnect_timeout` | No. (Defaults to: `5`)      | `number` or `null`         | The time it takes the bot to leave a voice channel when inactive by default on all servers. This setting can be customised per server and this will be used if a server has not set their own value.                                                                                                                           |
| DISCORD_TESTING_GUILD_ID           | `testing_guild_id`           | No. (Defaults to: `null`)   | `string` or `null`         | The ID of the testing guild. You do not need to set this to anything if you're not planning on developing the bot.                                                                                                                                                                                                             |
| DISCORD_PROVIDER_TYPE              | `provider_type`              | No. (Defaults to: `level`)  | Can be: `level` or `redis` | The type of data provider to use. [Level](https://github.com/google/leveldb) is a file based key-value store whereas [Redis](https://redis.io/) is a cache service. If you plan on just hosting the bot for a small server you should choose `level`, if you plan on sharding the client `redis` can be a better choice.       |
| DISCORD_REDIS_URL                  | `redis_url`                  | No. (Defaults to: `null`)   | `string` or `null`         | The URL of the redis service. This is only required if you have set the provider type to `redis`.                                                                                                                                                                                                                              |
| DISCORD_ENABLE_TTS_CHANNELS        | `enable_tts_channels`        | No. (Defaults to: `false`)  | `boolean`                  | Whether to enable the message-only TTS for specific channels. With this setting, you can send TTS messages by just sending messages to a channel that you have enabled a provider for. You need the privileged message intent (accessible in the `Bot` page of your bot's application page) for this feature to work properly. |

> If you set `enable_tts_channels` to `true`, you must enable the message content privileged intent in your bot's [application page](https://discord.com/developers/applications/).

## Running on Docker

Before you run this image, you should deploy your commands, you can do so by running:

```text
 docker run -it --rm -e DISCORD_TOKEN="your_token" -e DISCORD_ENABLE_TTS_CHANNELS="true/false" moonstarx/discord-tts-bot npm run deploy
```

After that, you can start a container with the bot's image by running:

```text
docker run -it -e DISCORD_TOKEN="YOUR DISCORD TOKEN" moonstarx/discord-tts-bot:latest
```

Check [configuration](#configuration) to see which environment variables you can use.

The following volumes can be used:

* `/opt/app/config`: The config folder for the bot, here you can use the `settings.json` file to configure the bot if you don't want to use environment variables.
* `/opt/app/data`: The data folder for the bot. If you use a `level` data provider you should set this volume to keep the bot's data persistent across restarts.

## Running on Repl.it

To run this bot on Repl.it, create a new Repl by importing this repository. Then, run the following commands:

```bash
chmod +x init-replit.sh
./init-replit.sh
```

This will set up the proper node environment for the bot.

Then, after you have [configured](#configuration) your bot, you should deploy your commands and start the bot with:

```text
npm run deploy
npm start
```

## Deploying to Heroku

To deploy to Heroku, you can click on the image below and login to your account.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/moonstar-x/discord-tts-bot)

You can now go back to your app's *Overview*, make sure you disable the *web* dyno and enable the *bot* dyno. Your bot should now be up and running. Remember you can always check your bot's console if you access the *View Logs* in the *More* dropdown menu.

## Usage

Here's a list of all the commands for the bot:

| Command                                   | Alias     | Description                                                                                         | Required Permissions |
|-------------------------------------------|-----------|-----------------------------------------------------------------------------------------------------|----------------------|
| /say \<message\>                          | /s        | Send a TTS message in your voice channel with your own settings or the ones saved for this server.  |                      |
| /stop                                     | /leave    | Stop the TTS bot and leave the channel.                                                             |                      |
| /default_settings                         |           | Get the default TTS settings currently set for the guild.                                           |                      |
| /my_settings                              |           | Get the TTS settings you currently have set for yourself.                                           |                      |
| /set_default_provider \<provider\>        |           | Sets the provider to be used by the say command for the server by default.                          | `MANAGE_GUILD`       |
| /set_my_provider \<provider\>             |           | Sets the provider to be used by the say command for yourself.                                       |                      |
| /set_locale \<locale\>                    |           | Sets locale to be used by the bot in this guild.                                                    | `MANAGE_GUILD`       |
| /set_timeout \<timeout\>                  |           | Sets the timeout for the bot to leave the channel when not in use.                                  | `MANAGE_GUILD`       |
| /google_langs                             |           | Display a list of the languages supported by the Google Translate provider.                         |                      |
| /google_say \<message\>                   |           | Send a Google Translate TTS message with multi-language support in your voice channel.              |                      |
| /google_set_default language \<language\> |           | Sets the language to be used by the say and google_say command by default.                          | `MANAGE_GUILD`       |
| /google_set_default speed \<speed\>       |           | Sets the speed to be used by the say and google_say command by default.                             | `MANAGE_GUILD`       |
| /google_set_my language \<language\>      |           | Sets the language to be used by the say and google_say command for yourself.                        |                      |
| /google_set_my speed \<speed\>            |           | Sets the speed to be used by the say and google_say command for yourself.                           |                      |
| /help                                     |           | Display a help message with all the available commands.                                             |                      |
| /aeiou_say \<message\>                    |           | Send an aeiou (sounds like Stephen Hawking) TTS message in your voice channel.                      |                      |

If you have `enable_tts_channels` set to `true`, you will have access to the additional commands:

| Command                                   | Description                                                                      | Required Permissions |
|-------------------------------------------|----------------------------------------------------------------------------------|----------------------|
| /channel_settings                         | Get the TTS settings associated to this channel (if applies).                    |                      |
| /delete_channel_provider                  | Disable message-only based TTS on this channel (deletes its saved settings).     | `MANAGE_CHANNELS`    |
| /set_channel_provider \<provider\>        | Sets the provider to be used by the message-only based TTS on specific channels. | `MANAGE_CHANNELS`    |
| /google_set_channel language \<language\> | Sets the language to be used by the say and google_say command by default.       | `MANAGE_CHANNELS`    |
| /google_set_channel speed \<speed\>       | Sets the speed to be used by the say and google_say command by default.          | `MANAGE_CHANNELS`    | 

> Up until now, these settings are saved in memory, which means if the bot crashes/restarts, all of these settings will go back to default (`Language: English, Speed: normal`).

## Language Support

Here's a list of all the supported languages by the Google Translate provider:

| Language Code | Language Name |
|---------------|---------------|
| af            | Afrikaans     |
| hy            | Armenian      |
| id            | Indonesian    |
| bn            | Bengali       |
| ca            | Catalan       |
| cs            | Czech         |
| da            | Danish        |
| de            | German        |
| en            | English       |
| es            | Spanish       |
| fil           | Filipino      |
| fr            | French        |
| hr            | Croatian      |
| is            | Icelandic     |
| it            | Italian       |
| jv            | Javanese      |
| km            | Khmer         |
| lv            | Latvian       |
| hu            | Hungarian     |
| ml            | Malayalam     |
| mr            | Marathi       |
| nl            | Dutch         |
| ne            | Nepali        |
| nb            | Norwegian     |
| pl            | Polish        |
| pt            | Portuguese    |
| ro            | Romanian      |
| si            | Sinhala       |
| sk            | Slovak        |
| su            | Sundanese     |
| sw            | Swahili       |
| fi            | Finnish       |
| sv            | Swedish       |
| ta            | Tamil         |
| te            | Telugu        |
| vi            | Vietnamese    |
| tr            | Turkish       |
| el            | Greek         |
| ru            | Russian       |
| sr            | Serbian       |
| uk            | Ukranian      |
| ar            | Arabic        |
| hi            | Hindi         |
| th            | Thai          |
| ko            | Korean        |
| cmn           | Chinese       |
| ja            | Japanese      |

## Add this bot to your server

You can add this bot to your server by clicking the image below:

[![Invite this bot to your server](https://i.imgur.com/4krikIF.jpg)](https://discord.com/api/oauth2/authorize?client_id=519207945318170654&permissions=3148800&scope=bot%20applications.commands)

## Author

This bot was made by [moonstar-x](https://github.com/moonstar-x).
