#Preriquisite
1. Mongo DB - To keep your session record. You can regster at https://mongodb.com/ for a free one to test the your game
2. NodeJS stack for Bot development with "node-telegram-bot-api" you can check it out at https://github.com/yagop/node-telegram-bot-api
3. Some knowledge of Telegram BOT API. You can check it out at https://core.telegram.org/bots/api
4. Some knowledge of Telegram WebAPP. You can check it out at https://core.telegram.org/bots/webapps
5. ZooGames API KEY and SECRET you can ask us on Telegram https://t.me/ZooEcosystem (Zoo.Games Sub Topic)

#Flow of Authentication
1. After the WebApp popped up. It will show a Form for user to login
2. If you set a right Mongo DB connection. telegram ID of user, JWT Token will be recorded and will be have a DM message from bot to user privately with Logged in Zoo.Games ID, Primary Address, Mirror Address
3. If something wrong, it will show an alert to let user fix it.
4. You can continue your BOT code to get TG user id, username to play what ever you want
5. You can follow the Zoo.Games Developer Document at https://dev.zoo.games/


#BOT Code
To call the Telegram Webapp. You can use sendMessage, sendPhoto API with reply markup of inline_keyboard

* We use "node-telegram-bot-api" node module to handle our interaction with Telegram API
** Don't use Bot Menu to call the WebAPP. It won't send a query of User Data to Web APP.

```javascript
bot.sendMessage(msg.chat.id, 'Please click button below to login', {
    reply_markup: {
        one_time_keyboard: true,
        inline_keyboard: [
            [
                { text: "LOGIN", web_app: { url: process.env.WEBAPP + "/login" } },
            ],
        ]
    }
}
```

#ENV Structure

```
BOT_TOKEN=
DB_URI = mongodb+srv://[Your Mongo crential and endpoint]/?retryWrites=true&w=majority


ZG_API_KEY=
ZG_SEC_KEY=
ZG_API_SERVER=https://api-test-serverless.vercel.app
ZG_GAME_ADDRESS=
ZG_APPROVE_AMOUNT=
NETWORK=testnet
EXPLORER=https://testnet.wanscan.org/tx/
```