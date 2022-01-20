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

  'command.google.settings.default.language.invalid': "Cela n'est pas une langue valide. Utilisez **/google_langs** pour obtenir une liste de toutes les langues disponibles.",
  'command.google.settings.default.language.success': 'Vous avez changé la langue par défaut à **{language}** avec succès.',
  'command.google.settings.default.speed.success': 'Vous avez changé la vitesse par défaut à **{speed}** avec succès.',

  'command.google.settings.my.language.invalid': "Cela n'est pas une langue valide. Utilisez **/google_langs** pour obtenir une liste de toutes les langues disponibles.",
  'command.google.settings.my.language.success': 'Vous avez changé votre langue à **{language}** avec succès.',
  'command.google.settings.my.speed.success': 'Vous avez changé votre vitesse à **{speed}** avec succès.',

  'command.google.langs.embed.title': 'Liste des langues disponibles pour le fournisseur de Google:',
  'command.google.langs.embed.description': `Voici une liste complète de toutes les langues disponibles pour le fournisseur de Google Translate.

    Pour changer votre langue, utilisez **/google_set_my language LANG_CODE**.
    Vous pouvez aussi utiliser **/google_set_default language LANG_CODE** pour changer la langue par défaut au cas où quelqu'un n'a aucune langue configurée.
`,
  'command.google.langs.embed.page': 'Page {number}:'
};

module.exports = {
  ...APP,
  ...ERROR,
  ...COMMAND
};
