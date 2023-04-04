
import { verifyTelegramWebAppData } from '../../utils/telegram';
import * as ApiKey from 'zoo-game-sdk/src/auth/apikey/index.js';
import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
import { parseJwt } from '@/utils/misc';


const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: false
});

export default async function handler(req, res) {
    await client.connect();
    console.log('Connected to MongoDB');

    const db_users = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION_USERS);

    console.log('BOT TOKEN', process.env.BOT_TOKEN)
    const { initData, user_id, zoogamesid, token2fa } = req.body;

    // Verify Telegram WebApp Data //
    if (!verifyTelegramWebAppData(initData)) {
        res.status(200).json({ success: false, message: 'Invalid Telegram Hash' });
        return;
    }

    // Login to ZooGames //
    if (zoogamesid && token2fa.length === 6) {
        let body = {
            username: zoogamesid, // username (ZooGamesID)
            token: token2fa, // 2fa
            approval: process.env.ZG_APPROVE_AMOUNT, // Approval Amount
            playSeconds: 315360000, // 1 year
            gameAddress: process.env.ZG_GAME_ADDRESS,
            share: true
        }
        let bodyMessage = JSON.stringify(body);
        let hmac = ApiKey.signData(bodyMessage, process.env.ZG_SEC_KEY);
        try {
            const ret = await axios.post(`${process.env.ZG_API_SERVER}/api/${process.env.ZG_API_KEY}/session/loginAndApprove`, body, { headers: { Authorization: `Bearer ${hmac}` } });
            // console.log(ret)
            let user_token = ret.data.data;
            if (ret.data?.success) {

                body = {
                    username: zoogamesid, // username (ZooGamesID)
                    jwt: user_token,
                    share: true
                }

                bodyMessage = JSON.stringify(body);
                hmac = ApiKey.signData(bodyMessage, process.env.ZG_SEC_KEY);

                const retKeepAlive = await axios.post(`${process.env.ZG_API_SERVER}/api/${process.env.ZG_API_KEY}/session/keepAlive`, body, { headers: { Authorization: `Bearer ${hmac}` } });
                user_token = retKeepAlive.data.data;
                let payload = parseJwt(user_token);
                console.log('Passed Keepalive API')
                if (retKeepAlive.data.success && payload.mirrorAddress && payload.primaryAddress) {
                    console.log(payload.mirrorAddress,payload.primaryAddress)
                    // Update to db //
                    db_users.updateOne({
                        telegram_id: Number(user_id),
                        network: process.env.NETWORK,
                    }, {
                        $set: {
                            dm_id: Number(user_id),
                            zoo_games_id: zoogamesid,
                            primary_address: payload.primaryAddress,
                            mirror_address: payload.mirrorAddress,
                            user_token: user_token,
                            network: process.env.NETWORK,
                        }
                    }, { upsert: true }).then(async (result) => {
                        console.log('Passed Updated to DB');
                        await bot.sendMessage(Number(user_id), 'Login successful with\n\n<b>ZooGames ID:</b>\n' + zoogamesid + '\n<b>Primary Address:</b>\n'+ payload.primaryAddress+'\n<b>Mirror Address:</b>\n'+payload.mirrorAddress, { parse_mode: 'HTML' });
                        res.status(200).json({ success: true, message: 'Login Success' })
                    });
                    return;
                }
                else
                {
                    throw new Error('Invalid ZooGames ID or Token 2FA');
                }
            }
            throw new Error('Invalid ZooGames ID or Token 2FA');
        }
        catch (e) {
            res.status(200).json({ success: false, message: e.message })
        }

    }
    else {
        res.status(200).json({ success: false, message: 'Invalid ZooGames ID or Token 2FA' })
    }

}