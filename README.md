## Screenshot of Login WebAPP
![image](https://user-images.githubusercontent.com/128964/229464547-be7f2601-0aa3-4bce-bead-33ad2eda9481.png)

## Prerequisite
1. **MongoDB** can be used to store session records for your game. You can sign up for a free account at https://mongodb.com/ to test your game.
2. For bot development using **NodeJS** stack, you can utilize "node-telegram-bot-api", which can be accessed at https://github.com/yagop/node-telegram-bot-api. (https://github.com/yagop/node-telegram-bot-api)
3. It is recommended to have some knowledge of **Telegram BOT API**, which can be found at https://core.telegram.org/bots/api, (https://core.telegram.org/bots/api) as well as Telegram WebAPP at https://core.telegram.org/bots/webapps. (https://core.telegram.org/bots/webapps)
4. To obtain **ZooGames API KEY and SECRET**, you can request it through Telegram at https://t.me/ZooEcosystem (Zoo.Games Sub Topic).
5. The **Vercel service** can be used to host your WebAPP.

## Flow of Authentication
The authentication flow involves the display of a login form on the WebApp. Upon successful connection to the right MongoDB and input of the user's Telegram ID, a JWT Token will be recorded. The user will also receive a direct message from the bot, containing their logged in Zoo.Games ID, Primary Address, and Mirror Address. If there are any errors, an alert will be displayed to prompt the user to fix it.

You can continue writing your BOT code to get TG user id, username and ZooGames JWT for further gameplay. The Zoo.Games Developer Document can be followed at https://dev.zoo.games/. (https://dev.zoo.games/)


## BOT Code
To call the Telegram Webapp, the sendMessage and sendPhoto APIs can be used with a **reply markup of inline_keyboard**. It is important to note that the Bot Menu should not be used to call the WebAPP, as it will not send a query of User Data to the WebAPP.
The following environment variables structure can be used:

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

## ENV Structure

```
#BOT AND DATABASE
BOT_TOKEN=
DB_URI = mongodb+srv://[Your Mongo crential and endpoint]/?retryWrites=true&w=majority

#ZOOGAMES
ZG_API_KEY=
ZG_SEC_KEY=
ZG_API_SERVER=https://api-test-serverless.vercel.app
ZG_GAME_ADDRESS=
ZG_APPROVE_AMOUNT=

#NETWORK CONFIGURATION
NETWORK=testnet
EXPLORER=https://testnet.wanscan.org/tx/
```
