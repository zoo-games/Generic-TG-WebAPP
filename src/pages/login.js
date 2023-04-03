import Script from "next/script";
import { useState } from "react";
import axios from "axios";
import styles from '@/styles/Login.module.scss';
import useTelegram from "@/hooks/useTelegram";
import OtpInput from 'react-otp-input';

export default function Login() {

    const { webapp, setWebapp } = useTelegram();
    const [zoogamesid, setZoogamesid] = useState('');
    const [token2fa, setToken2fa] = useState('');
    const [loading, setLoading] = useState(false);


    return (
        <>
            <Script src="https://telegram.org/js/telegram-web-app.js" onLoad={() => {
                setWebapp(window.Telegram.WebApp);
                console.log(window.Telegram.WebApp)
                document.querySelector('body').style.backgroundColor = window.Telegram.WebApp.themeParams.bg_color;
            }} />

            {
                webapp === undefined ? 'Please wait...' : ''
            }
            {
                webapp?.initData !== undefined && webapp?.initData !== "" ? <div className={styles.pageWrapper}>

                    <div className={styles.loginWrapper}>
                        <div className={styles.header}>
                            <div className={styles.img}>
                                <img src="/logo.png" />
                            </div>
                            <div className={styles.signin}>
                                <div className={styles.title}>
                                    HI, {webapp?.initDataUnsafe?.user?.first_name}
                                </div>
                                <div className={styles.subtitle}>
                                    Please signin to <span>{process.env.NEXT_PUBLIC_ZG_GAME_NAME}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <form onSubmit={(e) => { e.preventDefault }}>

                                <div className={styles.inputTitle}>
                                    <div className={styles.img}>
                                        <div className={styles.dummyID}>
                                            ID
                                        </div>
                                    </div>
                                    <div className={styles.zoogamesid}>
                                        <div className={styles.title}>
                                            ZooGamesID
                                        </div>
                                        <div className={styles.subtitle}>
                                            <a onClick={() => {
                                                webapp.openLink("https://www.zoo.games/");
                                            }}>Forgot your ID?</a>
                                        </div>
                                    </div>
                                    <div className={styles.zoogameslogo}>
                                        <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 138" width="280" height="138"><path id="<Compound Path>" fill="#0bd904" d="m280 41.5v55.7c0 22.6-18.6 41.2-41.2 41.2h-34.5v-22.1h-78.6l81.1-116.1h32c22.6 0 41.2 18.6 41.2 41.3zm-67 28.2c0-5.2-4.2-9.3-9.3-9.3-5.1 0-9.3 4.1-9.3 9.3 0 5.1 4.2 9.2 9.3 9.2 5.1 0 9.3-4.1 9.3-9.2zm19.6 19.5c0-5.1-4.2-9.2-9.3-9.2-5.1 0-9.3 4.1-9.3 9.2 0 5.2 4.2 9.3 9.3 9.3 5.1 0 9.3-4.1 9.3-9.3zm0-39.1c0-5.2-4.2-9.3-9.3-9.3-5.1 0-9.3 4.1-9.3 9.3 0 5.1 4.2 9.2 9.3 9.2 5.1 0 9.3-4.1 9.3-9.2zm19.6 19.6c0-5.2-4.2-9.3-9.3-9.3-5.2 0-9.3 4.1-9.3 9.3 0 5.1 4.1 9.2 9.3 9.2 5.1 0 9.3-4.1 9.3-9.2z"></path><path id="<Compound Path>" fill="#ffffff" d="m154.1 22.1l-81.2 116.3h-32.1c-22.7 0-41.3-18.6-41.3-41.2v-55.7c0-22.7 18.6-41.3 41.3-41.3h37.8v21.9zm-74.1 52v-10.3c0-2.3-1.9-4.1-4.1-4.1h-8.3c-2.3 0-4.1-1.9-4.1-4.1v-8.3c0-2.3-1.9-4.1-4.1-4.1h-10.4c-2.2 0-4.1 1.8-4.1 4.1v8.3c0 2.2-1.8 4.1-4.1 4.1h-8.3c-2.2 0-4.1 1.8-4.1 4.1v10.3c0 2.3 1.9 4.2 4.1 4.2h8.3c2.3 0 4.1 1.8 4.1 4.1v8.2c0 2.3 1.9 4.1 4.1 4.1h10.4c2.2 0 4.1-1.8 4.1-4.1v-8.2c0-2.3 1.8-4.1 4.1-4.1h8.3c2.2 0 4.1-1.9 4.1-4.2z"></path></svg>
                                    </div>
                                </div>

                                <input type="text" value={zoogamesid} onChange={(e) => {
                                    setZoogamesid(e.target.value)
                                }} />

                                <div className={styles.inputTitle} style={{ marginTop: 20 }}>
                                    <div className={styles.img}>
                                        <img src="/googleauthen.png" />
                                    </div>
                                    <div className={styles.g2fa}>
                                        <div className={styles.title}>
                                            GoogleAuthentication
                                        </div>
                                        <div className={styles.subtitle}>
                                            <a onClick={() => {
                                                webapp.openLink("https://www.zoo.games/");
                                            }}>Lost Your Google 2FA? </a>
                                        </div>
                                    </div>
                                </div>
                                <OtpInput
                                    
                                    value={token2fa}
                                    onChange={setToken2fa}
                                    numInputs={6}
                                    containerStyle={styles.otpInput}
                                    renderInput={(props) => <input {...props} />}
                                />
                                
                                <div className={styles.remark}>
                                    By connecting my account to {process.env.NEXT_PUBLIC_ZG_GAME_NAME}. I give permission to modiify or transfer my assets automatiicallly.
                                    I cerify that I will use my ZooGames account for the solo purpose of playing. I am aware that my ZooGames account is not a wallet.
                                </div>

                                <button type="submit" disabled={loading || !zoogamesid || !token2fa} onClick={() => {
                                    setLoading(true);
                                    axios.post('/api/login', { initData: webapp?.initData, user_id: webapp?.initDataUnsafe?.user?.id, zoogamesid: zoogamesid, token2fa: token2fa }).then(e => {

                                        setLoading(false);
                                        if (e.data.success === true) {
                                            webapp.close();
                                        }
                                        else {
                                            webapp.showAlert(e.data.message);
                                        }
                                    }).catch(e => { setLoading(false); webapp.showAlert('Something wrong. Please try again'); })
                                }}>
                                    {loading ? <span className="loader" style={{margin:'0 auto'}}></span> : <><div className={styles.btnContent}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M480.07 96H160a160 160 0 1 0 114.24 272h91.52A160 160 0 1 0 480.07 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z" /></svg><span>CONNECT AND PLAY</span></div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" /></svg></>}
                                </button>
                                <a className={styles.signup} tabIndex={4} onClick={() => { webapp.openLink("https://www.zoo.games/"); }}>
                                    <div className={styles.btnContent}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg>
                                        <span>
                                            <div>
                                                NO ACCOUNT?
                                            </div>
                                            <div>
                                                SIGNUP
                                            </div>
                                        </span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" /></svg>
                                </a>
                            </form>
                        </div>
                    </div>
                </div> : 'An error occured. Please reload this page'
            }
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10 }}>
                BuildID: {
                    process.env.NEXT_PUBLIC_CONFIG_BUILD_ID
                }
            </div>
        </>
    )
}