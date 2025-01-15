Чтобы передать данные из Telegram бота в Mini App (Telegram Web App), вам нужно воспользоваться специальными методами Telegram API.

Основные шаги:
Открыть Mini App через кнопку с webApp URL.
Передать данные через tg.sendData().
Шаги:
1. Открыть Mini App через Telegram кнопку с webApp:
   Пример inline клавиатуры для открытия Mini App:

javascript
Копировать код
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Открытие Mini App
bot.start((ctx) => {
ctx.reply('Откройте Mini App:', Markup.inlineKeyboard([
Markup.button.webApp('Открыть Mini App', 'https://your-app-url.com')
]));
});

bot.launch();
2. Передача данных в Mini App:
   Для передачи данных из бота в Mini App используйте функцию tg.sendData():

javascript
Копировать код
bot.command('send_data', (ctx) => {
const data = JSON.stringify({ message: "Hello from bot!" });
ctx.telegram.sendWebAppData(ctx.chat.id, 'YOUR_WEB_APP_KEY', data)
.then(response => ctx.reply('Данные успешно переданы!'))
.catch(err => ctx.reply('Ошибка при отправке данных!'));
});
3. Обработка данных в Mini App:
   На стороне Mini App обработайте переданные данные через Telegram Web App:

html
Копировать код
<script>
    const tg = window.Telegram.WebApp;

    tg.ready();

    tg.onEvent('mainButtonClicked', function () {
        tg.sendData(JSON.stringify({ userMessage: 'Данные от бота!' }));
    });
</script>
4. Обработка данных на сервере бота:
   В Telegram боте обработайте отправленные данные через событие web_app_data:

javascript
Копировать код
bot.on('web_app_data', (ctx) => {
const data = ctx.message.web_app_data.data;
ctx.reply(`Полученные данные: ${data}`);
});
Итог:
Вы открываете Mini App через кнопку webApp.
В боте можно отправить данные через tg.sendData(), которые будут обработаны в Mini App.
На стороне Mini App отправленные данные обрабатываются через window.Telegram.WebApp.sendData().
Таким образом, вы создаете взаимодействие между Telegram ботом и Mini App.