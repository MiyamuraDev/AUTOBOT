const moment = require("moment-timezone");
const axios = require('axios');

module.exports.config = {
    name: "heru",
    version: "1.0.0",
    hasPermission: 0,
    credits: "api by jerome",//api by jerome
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "GPT4",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('🐱 𝙷𝚎𝚕𝚕𝚘, 𝙸 𝚊𝚖 𝙷𝚎𝚛𝚞\n\n𝙷𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞 𝚝𝚘𝚍𝚊𝚢?', event.threadID, messageID);
        }
        api.sendMessage('🗨️ | 𝙷𝚎𝚛𝚞 i𝚜 𝚜𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...', event.threadID);

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-4-32k-0314`;
        const manilaTime = moment.tz('Asia/Manila');
        const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(`🎓 𝐇𝐞𝐫𝐮 𝐀𝐧𝐬𝐰𝐞𝐫\n━━━━━━━━━━━━━━━━\n\n🖋️ 𝙰𝚜𝚔: '${prompt}'\n\n𝗔𝗻𝘀𝘄𝗲𝗿: ${generatedText}\n\n🗓️ | ⏰ 𝙳𝚊𝚝𝚎 & 𝚃𝚒𝚖𝚎:\n.⋅ ۵ ${formattedDateTime} ۵ ⋅.\n\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
        } else {
            //console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        //console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};
