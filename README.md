# Discord TTS Bot

This is a simple TTS Bot that uses the Google Translate TTS API. With this bot you can send Text-to-Speech messages in multiple languages.

## Requirements

To self-host this bot you'll need the following:

* [git](https://git-scm.com/)
* [node.js](https://nodejs.org/en/)
* ffmpeg

**ffmpeg** should be installed by default on Linux and MacOS, in case it isn't, install it with your package manager. For Windows users, head over to [ffmpeg's official website](https://www.ffmpeg.org/download.html#build-windows) to download the binary which will need to be added to your **\$PATH**. If you don't know how to add folders to your **\$PATH**, check out this [guide](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/).

## Installation

In order to self-host this bot, first you'll need to clone this repository.

    git clone https://github.com/moonstar-x/discord-tts-bot.git

Then, inside the `config` folder, rename the file *settings.json.example* to *settings.json* and edit the file with your own Discord Token and the prefix you wish to use. If you don't have a discord token yet, you can see a guide on how to create it [here](https://github.com/moonstar-x/discord-downtime-notifier/wiki). Your file should look like this.

    {
      "discord_token": "YOUR_DISCORD_TOKEN",
      "prefix": "$",
      "allow_more_than_200_chars": "yes"
    }

The `allow_more_than_200_chars` property lets you choose wether you want TTS messages longer than 200 characters to be played (default: `yes`).

Install the dependencies:

    npm install

You can now run your bot:

    npm start

## Usage

Here's a list of all the commands for the bot:

| Command           | Description                                                      |
|-------------------|------------------------------------------------------------------|
| $say <message>    | Send a TTS message in your voice channel (up to 200 characters). |
| $stop             | Stop the TTS bot and leave the channel.                          |
| $lang <lang_code> | Change the TTS language.                                         |
| $langs            | Display a list of the supported languages.                       |
| $speed <number>   | Change the TTS spoken speed (must be between 1% and 100%).       |
| $help             | Display a list of the available commands.                        |

> Up until now, these settings are saved in memory, which means if the bot crashes/restarts, all of these settings will go back to default (`Language: English, Speed: 100%`).

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