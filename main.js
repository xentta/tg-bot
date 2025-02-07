import { Telegraf, Markup } from 'telegraf'
import { message } from 'telegraf/filters'

const token = ''
const webAppUrl = 'https://autotest.service.ag.mos.ru/mini-app/polls/11657/simple?uid=bhnkqz&source=tg'
const gz = 'https://gz.mos.ru'
const mp = 'https://ag-vmeste.ru/main'
const ag = 'https://ag.mos.ru/home'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
    ctx.reply(`Привет, ${JSON.stringify(bot.botInfo).split(',').join('\n')}`,
    // Markup.inlineKeyboard(
    //     [{ text: 'Кнопка 1', callback_data: 'button1' }],
    //     ),


    Markup.keyboard([
        [
          Markup.button.webApp('Тестируем голосования', webAppUrl),
          Markup.button.webApp('Город  Заданий', gz),
        ],
        [
          Markup.button.webApp('Активный гражданин', ag),
          Markup.button.webApp('МИЛП', mp)
        ],
    ]).resize())
})

bot.on(message('web_app_data'), async ctx => {
    const data = ctx.webAppData.data.json()
    ctx.reply(`Поздравляю: ${JSON.stringify(data)}`)
})
bot.telegram.setMyCommands([
    { command: '/start', description: 'Запуск бота' },
    { command: '/info', description: 'Открыть сайт' },
]);

// Команда для перехода по URL
bot.command('info', (ctx) => {
    ctx.reply('Можешь перейти сюда https://gz.mos.ru');
});

//Обработчик для инлайн кнопки
// bot.action('button1', (ctx) => {
//     ctx.reply('Вы нажали на Кнопку 1!');
//     ctx.answerCbQuery() // Метод отвечает на действие пользователя, закрывая "часики" на кнопке (если этого не сделать, кнопка останется в состоянии ожидания).
// });

bot.launch()