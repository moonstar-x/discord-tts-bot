const APP = {
  'app.message.deprecated': "Les commandes se sont transformées en commandes slash et vous ne pouvez plus les utiliser avec le préfixe. Vous pouvez utiliser la commande que vous avez essayé d'exécuter avec **/{commandName}**"
};

const ERROR = {
  'error.channel.not_viewable': "Je ne peux pas voir votre canal vocal. Est-ce-que j'ai les permissions suffisantes pour le voir ?",
  'error.channel.full': "Votre canal vocal n'a plus d'espace.",
  'error.channel.not_joinable': "Je ne peux pas rentrer dans votre canal vocal. Est-ce-que j'ai les permissions suffisantes pour y rentrer ?",
  'error.channel.not_speakable': "Je ne peux pas parler dans votre canal vocal. Est-ce-que j'ai les permissions suffisantes pour y parler ?"
};

const COMMAND = {
  'command.settings.default.no_settings': 'Pas de réglages associés à ce fournisseur.',
  'command.settings.default.embed.title': 'Voici les réglages actuels par défaut pour ce serveur.',
  'command.settings.default.embed.description': "Gardez à l'esprit que ceux-ci ne représentent pas vos réglages personnels. Ces réglages seront utilisés si vous n'avez pas toujours définis les vôtres.",
  'command.settings.default.current.provider': 'Fournisseur actuel',

  'command.settings.my.no_settings': 'Pas de réglages associés à ce fournisseur.',
  'command.settings.my.embed.title': 'Voici vos réglages actuels, {name}',
  'command.settings.my.embed.description': "Gardez à l'esprit que si vous n'avez pas défini vos réglages, vous verrez ceux par défaut.",
  'command.settings.my.current.provider': 'Fournisseur actuel',

  'command.set.default.provider.success': 'Vous avez changé le fournisseur par défaut à **{name}**.',

  'command.set.my.provider.success': 'Vous avez changé votre fournisseur par défaut à **{name}**.',

  'command.say.no_channel': 'Vous devez être dans un canal vocal.',
  'command.say.different_channel': 'Vous devez être dans mon canal vocal pour dire quelque chose.',
  'command.say.success': 'Je dirai ça maintenant.',
  'command.say.joined': "J'ai rejoint le canal vocal {channel}.",

  'command.stop.no_connection': 'Je ne suis pas dans un canal vocal.',
  'command.stop.different_channel': "Vous devez être dans un mon canal vocal pour m'arrêter.",
  'command.stop.success': "J'ai quitté le canal vocal {channel}.",

  'command.help.embed.title': "Message d'aide Text-to-Speech",
  'command.help.links.bug': 'Vous avez repéré un bug ? Signalez-le !',
  'command.help.links.website': 'Visitez mon site Internet',

  'command.amazon.langs.embed.title': "Liste des langues disponibles pour le fournisseur d'Amazon:",
  'command.amazon.langs.embed.description': `Voici une liste complète de toutes les langues disponibles pour le fournisseur d'Amazon.

    Pour changer votre langue, utilisez **/amazon_set_my language LANG_CODE**.
    Vous pouvez aussi utiliser **/amazon_set_default language LANG_CODE** pour changer la langue par défaut au cas où quelqu'un n'a aucune langue configurée.`,
  'command.amazon.langs.embed.page': 'Page {number}:',

  'command.amazon.voices.embed.title': 'Liste des voix disponibles pour la langue {language}:',
  'command.amazon.voices.embed.description': `Voice une liste complète de toutes les voix disponibles pour la langue {language}.
    
    Pour changer votre voix, utilisez **/amazon_set_my voice VOICE_NAME**.
    Vous pouvez aussi utiliser **/amazon_set_default voice VOICE_NAME** pour changer la voix par défaut au cas où quelqu'un n'a aucune voix configurée.`,
  'command.amazon.voices.error.unsupported': "La langue **{language}** n'est pas disponible pour le fournisseur d'Amazon. Utilisez **/amazon_langs** pour obtenir une liste des langues disponibles.",

  'command.amazon.settings.default.language.unsupported': "La langue **{language}** n'est pas disponible pour le fournisseur d'Amazon. Utilisez **/amazon_langs** pour obtenir une liste des langues disponibles.",
  'command.amazon.settings.default.language.success': 'Vous avez changé la langue par défaut à **{language}** avec la voix de **{voice}**.',

  'command.amazon.settings.default.voice.invalidated': 'La langue par défaut sauvegardée parait être invalide. Veuillez réinitializer la langue par défaut avec **/amazon_set_default language LANG_CODE**.',
  'command.amazon.settings.default.voice.unsupported': "La voix **{voice}** n'est pas disponible pour la langue par défaut. Utilisez **/amazon_voices** pour obtenir une liste des voix disponibles.",
  'command.amazon.settings.default.voice.success': 'Vous avez changé la voix par défaut à **{voice}** avec succès.',

  'command.amazon.settings.default.volume.success': 'Vous avez changé le volume par défaut à **{volume}** avec succès.',
  'command.amazon.settings.default.rate.success': 'Vous avez changé le rythme par défaut à **{rate}** avec succès.',
  'command.amazon.settings.default.pitch.success': 'Vous avez changé le ton de voix par défaut à **{pitch}** avec succès.',

  'command.amazon.settings.my.language.unsupported': "La langue **{language}** n'est pas disponible pour le fournisseur d'Amazon. Utilisez **/amazon_langs** pour obtenir une liste des langues disponibles.",
  'command.amazon.settings.my.language.success': 'Vous avez changé votre langue à **{language}** avec la voix de **{voice}**.',

  'command.amazon.settings.my.voice.invalidated': 'Votre langue sauvegardée parait être invalide. Veuillez réinitializer votre langue avec **/amazon_set_my language LANG_CODE**.',
  'command.amazon.settings.my.voice.unsupported': "La voix **{voice}** n'est pas disponible pour votre langue. Utilisez **/amazon_voices** pour obtenir une liste des voix disponibles.",
  'command.amazon.settings.my.voice.success': 'Vous avez changé votre voix à **{voice}** avec succès.',

  'command.amazon.settings.my.volume.success': 'Vous avez changé votre volume à **{volume}** avec succès.',
  'command.amazon.settings.my.rate.success': 'Vous avez changé votre rythme à **{rate}** avec succès.',
  'command.amazon.settings.my.pitch.success': 'Vous avez changé votre ton de voix à **{pitch}** avec succès.',

  'command.google.settings.default.language.invalid': "Cela n'est pas une langue valide. Utilisez **/google_langs** pour obtenir une liste de toutes les langues disponibles.",
  'command.google.settings.default.language.success': 'Vous avez changé la langue par défaut à **{language}** avec succès.',
  'command.google.settings.default.speed.success': 'Vous avez changé la vitesse par défaut à **{speed}** avec succès.',

  'command.google.settings.my.language.invalid': "Cela n'est pas une langue valide. Utilisez **/google_langs** pour obtenir une liste de toutes les langues disponibles.",
  'command.google.settings.my.language.success': 'Vous avez changé votre langue à **{language}** avec succès.',
  'command.google.settings.my.speed.success': 'Vous avez changé votre vitesse à **{speed}** avec succès.',

  'command.google.langs.embed.title': 'Liste des langues disponibles pour le fournisseur de Google:',
  'command.google.langs.embed.description': `Voici une liste complète de toutes les langues disponibles pour le fournisseur de Google Translate.

    Pour changer votre langue, utilisez **/google_set_my language LANG_CODE**.
    Vous pouvez aussi utiliser **/google_set_default language LANG_CODE** pour changer la langue par défaut au cas où quelqu'un n'a aucune langue configurée.`,
  'command.google.langs.embed.page': 'Page {number}:',

  'command.microsoft.langs.embed.title': 'Liste des langues disponibles pour le fournisseur de Microsoft:',
  'command.microsoft.langs.embed.description': `Voici une liste complète de toutes les langues disponibles pour le fournisseur de Microsoft.

    Pour changer votre langue, utilisez **/ms_set_my language LANG_CODE**.
    Vous pouvez aussi utiliser **/ms_set_default language LANG_CODE** pour changer la langue par défaut au cas où quelqu'un n'a aucune langue configurée.`,
  'command.microsoft.langs.embed.page': 'Page {number}:',

  'command.microsoft.voices.embed.title': 'Liste des voix disponibles pour la langue {language}:',
  'command.microsoft.voices.embed.description': `Voice une liste complète de toutes les voix disponibles pour la langue {language}.
    
    Pour changer votre voix, utilisez **/ms_set_my voice VOICE_NAME**.
    Vous pouvez aussi utiliser **/ms_set_default voice VOICE_NAME** pour changer la voix par défaut au cas où quelqu'un n'a aucune voix configurée.`,
  'command.microsoft.voices.error.unsupported': "La langue **{language}** n'est pas disponible pour le fournisseur de Microsoft. Utilisez **/ms_langs** pour obtenir une liste des langues disponibles.",

  'command.microsoft.settings.my.language.unsupported': "La langue **{language}** n'est pas disponible pour le fournisseur de Microsoft. Utilisez **/ms_langs** pour obtenir une liste des langues disponibles.",
  'command.microsoft.settings.my.language.success': 'Vous avez changé votre langue à **{language}** avec la voix de **{voice}**.',

  'command.microsoft.settings.my.voice.invalidated': 'Votre langue sauvegardée parait être invalide. Veuillez réinitializer votre langue avec **/ms_set_my language LANG_CODE**.',
  'command.microsoft.settings.my.voice.unsupported': "La voix **{voice}** n'est pas disponible pour votre langue. Utilisez **/ms_voices** pour obtenir une liste des voix disponibles.",
  'command.microsoft.settings.my.voice.success': 'Vous avez changé votre voix à **{voice}** avec succès.',

  'command.microsoft.settings.my.volume.success': 'Vous avez changé votre volume à **{volume}** avec succès.',
  'command.microsoft.settings.my.rate.success': 'Vous avez changé votre rythme à **{rate}** avec succès.',
  'command.microsoft.settings.my.pitch.success': 'Vous avez changé votre ton de voix à **{pitch}** avec succès.',

  'command.locale.success': 'Vous avez changée la langue du bot à **{locale}**.',

  'command.timeout.out_of_range': 'Temps invalide, il doit se trouver entre **{min}** et **{max}**.',
  'command.timeout.success': "Je quitterai le canal vocal après de **{timeout}** minutes d'inactivité."
};

const CHANNEL_COMMANDS = {
  'channel_commands.set.success': 'Vous avez changé le fournisseur pour ce canal à **{name}**.',

  'channel_commands.settings.enabled.embed.title': 'Voici les réglages actuels du canal **#{channel}**',
  'channel_commands.settings.enabled.embed.description': "Gardez à l'esprit que ces réglages seront utilisés lorsque vous enverrez des messages à ce canal.",
  'channel_commands.settings.enabled.current.provider': 'Fournisseur actuel',
  'channel_commands.settings.enabled.no_settings': 'Pas de réglages associés à ce fournisseur.',

  'channel_commands.settings.disabled.embed.title': 'TTS basé uniquement en messages est désactivé dans ce canal',
  'channel_commands.settings.disabled.embed.description': 'Vous pouvez activer le TTS basé uniquement en messages ici en utilisant **/set_channel_provider** et en choisissant le fournisseur à utiliser.',

  'channel_commands.delete.already_disabled': 'TTS basé uniquement en messages est déjà désactivé dans ce canal.',
  'channel_commands.delete.success': 'TTS basé uniquement en messages est désormais désactivé et ses réglages sont éliminés.',

  'channel_commands.google.settings.language.invalid': "Cela n'est pas une langue valide. Utilisez **/google_langs** pour obtenir une liste de toutes les langues disponibles.",
  'channel_commands.google.settings.language.success': 'Vous avez changé la langue de ce canal à **{language}** avec succès.',
  'channel_commands.google.settings.speed.success': 'Vous avez changé la vitesse de ce canal à **{speed}** avec succès.'
};

module.exports = {
  ...APP,
  ...ERROR,
  ...COMMAND,
  ...CHANNEL_COMMANDS
};
