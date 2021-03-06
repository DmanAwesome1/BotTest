// 
// yeet
const Discord = require('discord.js')
const bot = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const fs = require("fs")
bot.commands = new Discord.Collection();

bot.on('ready', () => {
    console.log('Bot online')

    fs.readdir('./commands', (err, files) => {
        if(err) return console.log(err); 

        let jsfile = files.filter(f => f.split(".").pop() == 'js');


        if(jsfile.length <= 0) {return console.log("Could not find any commands!")}

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })
})

bot.on('message', (message) => {
    if(message.author.bot) return; 
    if(message.channel.type !== 'text') return; 
    let prefix = '!'; 
     // hello there ['hello', 'there']
     // !ban user ['!ban', 'user', 'reason']
     let MessageArray = message.content.split(' ')
     let cmd = MessageArray[0].slice(prefix.length)
     let args = MessageArray.slice(1)

     if(!message.content.startsWith(prefix)) return;

     let commandfile = bot.commands.get(cmd);
     if(commandfile) {commandfile.run(bot,message,args)}
 
})
   
bot.on('guildMemberUpdate', (oldMember , newMember) => {
    if(oldMember.nickname !== newMember.nickname) {
        newMember.send('You changed your nickname!')
    }
    let oldAvatar = oldMember.user.avatarURL() //https://link.com
    let newAvater = newMember.user.avatarURL(); //https://link.com
    if(oldAvatar !== newAvatar) {
        newMember.send('Your avatar has changed!')
    }
})
bot.login('ODUxNzA5NTExMjQ4NTExMDA2.YL8OSw.-VKAQUfsU0L7W-IFxd08EfymkJc')