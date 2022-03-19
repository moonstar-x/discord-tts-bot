const APP = {
  'app.message.deprecated': 'Los comandos han sido convertidos a comandos slash y no podrás utilizarlos más con el prefijo. Puedes correr el comando que trataste de usar enviando: **/{commandName}**'
};

const ERROR = {
  'error.channel.not_viewable': 'No puedo ver tu canal de voz. ¿Tengo los suficientes permisos para verlo?',
  'error.channel.full': 'Tu canal de voz está lleno.',
  'error.channel.not_joinable': 'No puedo unirme a tu canal de voz. ¿Tengo los suficientes permisos para unirme?',
  'error.channel.not_speakable': 'No puedo hablar en tu canal de voz. ¿Tengo los suficientes permisos para hablar en él?'
};

const COMMAND = {
  'command.settings.default.no_settings': 'No existe configuración asociada a este proveedor.',
  'command.settings.default.embed.title': 'Aquí está la configuración por defecto para este servidor',
  'command.settings.default.embed.description': 'Toma en cuenta que esta configuración no refleja la tuya personal. Esta configuración será utilizada en el caso de no haber configurado la tuya.',
  'command.settings.default.current.provider': 'Proveedor actual',

  'command.settings.my.no_settings': 'No existe configuración asociada a este proveedor.',
  'command.settings.my.embed.title': 'Aquí está tu configuración actual, {name}',
  'command.settings.my.embed.description': 'Toma en cuenta que si no has configurado alguna de estas opciones verás las por defecto.',
  'command.settings.my.current.provider': 'Proveedor actual',

  'command.set.default.provider.success': 'Has cambiado el proveedor por defecto a **{name}** con éxito.',

  'command.set.my.provider.success': 'Has cambiado el proveedor por defecto a **{name}** con éxito.',

  'command.say.no_channel': 'Necesitas estar en un canal de voz.',
  'command.say.different_channel': 'Necesitas estar en mi canal de voz para decir algo.',
  'command.say.success': 'Diré eso ahora.',
  'command.say.joined': 'Entré a {channel}.',

  'command.stop.no_connection': 'No estoy en un canal de voz.',
  'command.stop.different_channel': 'Necesitas estar en mi canal de voz para detenerme.',
  'command.stop.success': 'He salido del canal de voz {channel} con éxito.',

  'command.help.embed.title': 'Mensaje de ayuda de Text-to-Speech',
  'command.help.links.bug': '¿Encontraste un bug? ¡Repórtalo!',
  'command.help.links.website': 'Visita mi sitio web',

  'command.google.settings.default.language.invalid': 'Ese no es un idioma válido. Escribe **/google_langs** para obtener una lista de los idiomas disponibles.',
  'command.google.settings.default.language.success': 'Has cambiado el idioma por defecto a **{language}** con éxito.',
  'command.google.settings.default.speed.success': 'Has cambiado la velocidad por defecto a **{speed}** con éxito.',

  'command.google.settings.my.language.invalid': 'Ese no es un idioma válido. Escribe **/google_langs** para obtener una lista de los idiomas disponibles.',
  'command.google.settings.my.language.success': 'Has cambiado tu idioma a **{language}** con éxito.',
  'command.google.settings.my.speed.success': 'Has cambiado tu velocidad a **{speed}** con éxito.',

  'command.google.langs.embed.title': 'Lista de los idiomas disponibles para el proveedor de Google:',
  'command.google.langs.embed.description': `Esta es una lista completa de todos los idiomas disponibles para el proveedor de Google Translate.
    
      Para cambiar tu propio idioma, utiliza **/google_set_my language LANG_CODE**.
      Puedes también utilizar **/google_set_default language LANG_CODE** para cambiar el idioma por defecto que se utilizará en caso de que alguien no tenga uno configurado.`,
  'command.google.langs.embed.page': 'Página {number}:',

  'command.locale.success': 'Has cambiado el idioma del bot a **{locale}**.',

  'command.timeout.out_of_range': 'Tiempo inválido, necesitar estar entre **{min}** y **{max}**.',
  'command.timeout.success': 'Me iré del canal de voz después de **{timeout}** minutos de inactividad.'
};

const CHANNEL_COMMANDS = {
  'channel_commands.set.success': 'Has cambiado el proveedor de este canal a **{name}** con éxito.',

  'channel_commands.settings.enabled.embed.title': 'Aquí está la configuración actual para el canal **#{channel}**',
  'channel_commands.settings.enabled.embed.description': 'Toma en cuenta que esta configuración se usa nada más cuando envíes mensajes regulares en este canal.',
  'channel_commands.settings.enabled.current.provider': 'Proveedor actual',
  'channel_commands.settings.enabled.no_settings': 'No existe configuración asociada a este proveedor.',

  'channel_commands.settings.disabled.embed.title': 'TTS basado en solo mensajes está desactivado en este canal',
  'channel_commands.settings.disabled.embed.description': 'Puedes activar el TTS basado en solo mensajes aquí **/set_channel_provider** y escogiendo el proveedor a usar.',

  'channel_commands.delete.already_disabled': 'TTS basado en solo mensajes ya está desactivado en este canal.',
  'channel_commands.delete.success': 'TTS basado en solo mensajes ha sido desactivado en este canal y su configuración ha sido eliminada.',

  'channel_commands.google.settings.language.invalid': 'Ese no es un idioma válido. Escribe **/google_langs** para obtener una lista de los idiomas disponibles.',
  'channel_commands.google.settings.language.success': 'Has cambiado el idioma de este canal a **{language}** con éxito.',
  'channel_commands.google.settings.speed.success': 'Has cambiado la velocidad de este canal a **{speed}** con éxito.'
};

module.exports = {
  ...APP,
  ...ERROR,
  ...COMMAND,
  ...CHANNEL_COMMANDS
};
