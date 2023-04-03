import CryptoJS from 'crypto-js';
export const verifyTelegramWebAppData = async (telegramInitData) => {
    const initData = new URLSearchParams(telegramInitData);
    const hash = initData.get("hash");
    let dataToCheck = [];

    initData.sort();
    initData.forEach((val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`));

    const secret = CryptoJS.HmacSHA256(process.env.BOT_TOKEN, "WebAppData");
    const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(CryptoJS.enc.Hex);
    return _hash === hash;
}
