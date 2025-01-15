1. Основные методы для запуска и остановки
   .launch([options])
   Описание: Запускает бота, подключая его к Telegram через webhook или long polling.
   Опции:
   dropPendingUpdates: Удаляет все ожидающие обновления перед запуском.
   webhook: Настройки webhook.
   domain: URL для webhook.
   port: Локальный порт для прослушивания.
   host: Локальный хост (по умолчанию 0.0.0.0).
   Пример:
   javascript
   Копировать код
   bot.launch();
   .stop()
   Описание: Останавливает бота, отключая его от Telegram API.
   Пример:
   javascript
   Копировать код
   bot.stop();
2. Методы обработки событий
   .on(event, middleware)
   Описание: Обрабатывает обновления определённого типа, например message, callback_query, edited_message и т.д.
   Пример:
   javascript
   Копировать код
   bot.on('message', (ctx) => {
   ctx.reply('Сообщение получено!');
   });
   .hears(triggers, middleware)
   Описание: Обрабатывает текстовые сообщения, соответствующие указанным triggers (строка, регулярное выражение или массив).
   Пример:
   javascript
   Копировать код
   bot.hears('Привет', (ctx) => {
   ctx.reply('Привет, как дела?');
   });
   .command(command, middleware)
   Описание: Обрабатывает команды, начинающиеся с / (например, /start или /help).
   Пример:
   javascript
   Копировать код
   bot.command('start', (ctx) => {
   ctx.reply('Добро пожаловать!');
   });
   .action(callbackData, middleware)
   Описание: Обрабатывает callback_data от inline клавиатур.
   Пример:
   javascript
   Копировать код
   bot.action('button1', (ctx) => {
   ctx.reply('Вы нажали кнопку 1!');
   });
   .use(middleware)
   Описание: Регистрирует глобальное middleware, которое будет выполнено для всех обновлений.
   Пример:
   javascript
   Копировать код
   bot.use((ctx, next) => {
   console.log('Новое событие!');
   return next();
   });
3. Методы для работы с контекстом (ctx)
   .start(middleware)
   Описание: Специальный обработчик для команды /start.
   Пример:
   javascript
   Копировать код
   bot.start((ctx) => {
   ctx.reply('Добро пожаловать в бота!');
   });
   .help(middleware)
   Описание: Обрабатывает команду /help.
   Пример:
   javascript
   Копировать код
   bot.help((ctx) => {
   ctx.reply('Список доступных команд...');
   });
   .settings(middleware)
   Описание: Обрабатывает команду /settings.
   Пример:
   javascript
   Копировать код
   bot.settings((ctx) => {
   ctx.reply('Настройки бота...');
   });
4. Методы для работы с обновлениями
   .handleUpdate(update, [ctx])
   Описание: Позволяет вручную обработать обновление, переданное в виде объекта.
   Пример:
   javascript
   Копировать код
   bot.handleUpdate({ message: { text: 'Привет' } });
   .webhookCallback(path)
   Описание: Возвращает middleware для обработки webhook запросов.
   Пример:
   javascript
   Копировать код
   app.use(bot.webhookCallback('/secret-path'));
5. Утилиты для работы с контекстом
   Методы внутри объекта ctx (контекста):

.reply(text, [extra])
Отправляет текстовое сообщение пользователю.
.answerCbQuery([text, options])
Отвечает на callback запросы inline кнопок.
.deleteMessage([messageId])
Удаляет сообщение.
.editMessageText(text, [extra])
Редактирует текст существующего сообщения.
.sendSticker(sticker, [extra])
Отправляет стикер.
.sendPhoto(photo, [extra])
Отправляет фотографию.
6. Методы для работы с сценами и сессиями
   Если вы используете модули Scenes или Sessions (например, @telegraf/scenes):

.use(session())
Подключает middleware для управления сессиями.
.use(stage.middleware())
Подключает сцены, такие как Wizard или BaseScene.
Итог
Объект Telegraf предоставляет множество методов для гибкой настройки поведения вашего бота. Вы можете:

Обрабатывать команды, текстовые сообщения, inline кнопки.
Настраивать глобальные middleware.
Использовать webhook или long polling.
Управлять ответами, редактированием сообщений и сессиями.