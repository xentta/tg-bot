import { Telegraf, Markup } from 'telegraf'

const token = '7946503633:AAHvng-wwXe4jZ8smNs9NbPKaF-U0FoBFpM'
const webAppUrl = 'https://dev.gz.mos.ru'
const bot = new Telegraf(token)
bot.command('start', (ctx) => {
    ctx.reply('Привет, это тестовое сообщение',
    Markup.keyboard([Markup.button.webApp('Открыть приложение Город  Заданий', webAppUrl)]))
})
bot.launch()