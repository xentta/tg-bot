import { Telegraf, Markup } from 'telegraf'
import { message } from 'telegraf/filters'

const token = '7946503633:AAHvng-wwXe4jZ8smNs9NbPKaF-U0FoBFpM'
// const webAppUrl = 'https://autotest.service.ag.mos.ru/mini-app/polls/11622/simple/?uid=8dokoC&channel=tg'
const webAppUrl = 'https://ag-vmeste.ru/main'
const gz = 'https://gz.mos.ru'
const bot = new Telegraf(token)
bot.command('start', (ctx) => {
    ctx.reply('Привет, это тестовое сообщение',
    Markup.keyboard([
        [
          Markup.button.webApp('Тестируем голосования', webAppUrl),
          Markup.button.webApp('Город  Заданий', gz)
        ]
    ]).resize())
})
bot.on(message('web_app_data'), async ctx => {
    const data = ctx.webAppData.data.json()
    ctx.reply(`Поздравляю: ${data}`)
})
bot.launch()