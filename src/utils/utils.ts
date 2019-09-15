import CryptoJS from "crypto-js"
import config from "../config/config"

// 加密
const encrypt = (msg: string) => CryptoJS.AES.encrypt(msg, config.key).toString()
// 解密
const decrypt = (ciphertext: string) => CryptoJS.AES.decrypt(ciphertext, config.key).toString(CryptoJS.enc.Utf8)

export {
    encrypt,
    decrypt,
}