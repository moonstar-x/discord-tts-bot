[![discord](https://img.shields.io/discord/730998659008823296.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/mhj3Zsv)
[![trello](https://img.shields.io/badge/Trello-discord--tts--bot-RGB(81%2C%20190%2C%20110))](https://trello.com/b/305ReJxK/discord-tts-bot)
[![ci-build-status](https://img.shields.io/github/workflow/status/moonstar-x/discord-tts-bot/CI?logo=github)](https://github.com/moonstar-x/discord-tts-bot)
[![open-issues-count](https://img.shields.io/github/issues-raw/moonstar-x/discord-tts-bot?logo=github)](https://github.com/moonstar-x/discord-tts-bot)
[![docker-image-size](https://img.shields.io/docker/image-size/moonstarx/discord-tts-bot?logo=docker)](https://hub.docker.com/repository/docker/moonstarx/discord-tts-bot)
[![docker-pulls](https://img.shields.io/docker/pulls/moonstarx/discord-tts-bot?logo=docker)](https://hub.docker.com/repository/docker/moonstarx/discord-tts-bot)

# Discord TTS Bot

This is a simple TTS Bot that uses the Google Translate TTS API. With this bot you can send Text-to-Speech messages in multiple languages.

## Requirements

To self-host this bot you'll need the following:

* [git](https://git-scm.com/)
* [node.js](https://nodejs.org/en/) (Version 12.0.0 or higher)
* ffmpeg

**ffmpeg** should be installed by default on Linux and MacOS, in case it isn't, install it with your package manager. For Windows users, head over to [ffmpeg's official website](https://www.ffmpeg.org/download.html#build-windows) to download the binary which will need to be added to your **\$PATH**. If you don't know how to add folders to your **\$PATH**, check out this [guide](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/).

## Installation

In order to self-host this bot, first you'll need to clone this repository.

```text
git clone https://github.com/moonstar-x/discord-tts-bot.git
```

Then, inside the `config` folder, rename the file *settings.json.example* to *settings.json* and edit the file with your own Discord Token and the prefix you wish to use. If you don't have a discord token yet, you can see a guide on how to create it [here](https://github.com/moonstar-x/discord-downtime-notifier/wiki). 

Your file should look like this.

```json
{
    "discord_token": "YOUR_DISCORD_TOKEN",
    "prefix": "$"
}
```

You may also configure these options with the respective environment variables: `DISCORD_TOKEN` and `PREFIX`. The settings set with the environment variables will take higher precedence than the ones in the config JSON file.

Install the dependencies with:

```text
npm ci --only=prod
```

Or, if you want to also install the devDependencies:

```text
npm install
```

You can now run your bot:

```text
npm start
```

## Running on Docker

You can start a container with the bot's image by running:

```text
docker run -it -e DISCORD_TOKEN="YOUR DISCORD TOKEN" moonstarx/discord-tts-bot:latest
```

The following environment variables can be used:

* `DISCORD_TOKEN`: Your bot's Discord token. You can see how to get one on [this guide](https://github.com/moonstar-x/discord-downtime-notifier/wiki/Getting-a-Discord-Bot-Token).
* `BOT_PREFIX`: The prefix that will be used for the commands. It defaults to `$`.

The following volumes can be used:

* `opt/app/config`: The config folder for the bot, here you can use the `settings.json` file to configure the bot if you don't want to use environment variables.

## Deploying to Heroku

To deploy to Heroku, you can click on the image below and login to your account.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/moonstar-x/discord-tts-bot)

You can now go back to your app's *Overview*, make sure you disable the *web* dyno and enable the *bot* dyno. Your bot should now be up and running. Remember you can always check your bot's console if you access the *View Logs* in the *More* dropdown menu.

## Usage

Here's a list of all the commands for the bot:

| Command            | Description                                                                  |
|--------------------|------------------------------------------------------------------------------|
| $say \<message>    | Send a TTS message in your voice channel.                                    |
| $aeiou \<message>  | Send an aeiou (similar to Moonbase Alpha) TTS message in your voice channel. |
| $stop              | Stop the TTS bot and leave the channel.                                      |
| $lang \<lang_code> | Change the TTS language.                                                     |
| $langs             | Display a list of the supported languages.                                   |
| $speed \<slow\|normal>   | Change the TTS spoken speed (must be either **normal** for normal speed or **slow** for slow speed).                   |
| $help              | Display a help message with all the available commands.                      |

> Up until now, these settings are saved in memory, which means if the bot crashes/restarts, all of these settings will go back to default (`Language: English, Speed: normal`).

## Language Support

Here's a list of all the supported languages:

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

[![Invite this bot to your server](https://i.imgur.com/q4U9N1G.png)](https://discordapp.com/oauth2/authorize?client_id=519207945318170654&scope=bot&permissions=3148800)

## Author

This bot was made by [moonstar-x](https://github.com/moonstar-x).
