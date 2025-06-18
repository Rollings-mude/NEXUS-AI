




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMExRd2x4NW1IQkVNM05CaUF4Zkhmd2FvZmJ4d3BSU0I4dVIzUGZMeXZIQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWhtL1dGOGxZUm0rRGZSLy9tdXQyOXVBbXpVbjNPUXB5M3FWWXdGbHhraz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnUFhROWt0ZU1sL2RxQ2FJM0dTN0llUUI3MWx0MUlCMkllV1VaQk9iOTFNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwQjVNblBEQkxPdGM2Skg1VDVURjJyMFAzbW5vL3JveWdtNldNYWpyaVdZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNMdzllaGo4UFhndE4zTE5mQmdNVXJ0TVpyaWV2b3FENDVnQUs3VDFhV289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBTbnZXeTlReGl4MzdZcVAvNmozT0U3RmMwZzJRQnBxTXZVWHBuckowaDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUQ1N2tKZkhVUTJxMlFjZkIwSGI4Z25lNWJsVVJMZnFSaFl2Sy9BUENtND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlc5QWNEWDdkTERCZzZYK2gwaXhzNm92NGJsUERsSENkT2VOWHRxenUyVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRtMkZzWG91YTNCUlN2Ni9sUkp5MFpJMGRDS011STJsN2FlaVBmMG9TblBvNlNMaGpvYTExMS9FZ0I2S0hldmFNckVORFR6eFJvRU93M3ZoQVkwV0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg0LCJhZHZTZWNyZXRLZXkiOiJWbzNSSWVGYnRTNWRyclpFbVE5dHkwYzVJTnd3K00zQUtXZURHbjRBMU1RPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxODQzNjM4OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1OUQzQ0NERkFDODlGMEJCNTdCM0M0OTFBRkFGRDA1MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwMjcyNzEwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJUR1JWN1FRVCIsIm1lIjp7ImlkIjoiMjYzNzE4NDM2Mzg5OjlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyNzI4NjQwNzA2MTUyMjc6OUBsaWQiLCJuYW1lIjoiRGVpdHkgTXVkZSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFNNeG5RUXNKWE13Z1lZQkNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoianVCRFlGdWJyQzEyOUN3SGpzN3JXNmowL1kwd2Faam5LZXl6Z0QwZENFdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVHg5aXVpNnpSMG9JaGpWY2ptdnJ5QVZ6TTBIWHBtMnIrNVV6cGw5ME5wVG8rK3FtZjRsenZDakV1YWFQdCtjTzJBQmF0UHhMWkFFaks1ZGwxdGttQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6IkRCWGtHeTZvY2ZjaEVJUkR5d296VDV1SU0wUk9ZNzhhVTgyZzZRbWNxRHZxNkhEUDdlODVsdGhmWXg0Q3RSekVUcFdSbS95ODEwNlEwRk1Ma2pMekNRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE4NDM2Mzg5OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWTdnUTJCYm02d3RkdlFzQjQ3TzYxdW85UDJOTUdtWTV5bnNzNEE5SFFoTSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwMjcyNzAzLCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQlFzIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Rollings",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263718436389",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
