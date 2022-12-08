const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = "!"//// هنا البرفكس حق البوت
const Database = require('st.db')
const db = new Database('Thanks')
const talkedRecently = new Set();

client.on("message", async msg =>{
if(msg.content.startsWith(prefix + "thx")){
if (talkedRecently.has(msg.author.id)) {
const user = msg.mentions.users.first()
await db.add(user.id,1)
const embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setColor("GREEN")
.setDescription(`Done Add Thx to ${user}`)
.setTimestamp()
msg.channel.send(embed)
 
        talkedRecently.add(msg.author.id);
        setTimeout(() => {

          talkedRecently.delete(msg.author.id);
        }, 7200000);
    } 
}
});

client.on("message", async message =>{
if(message.content.startsWith(prefix + "thanks")){
const user = message.mentions.users.first() || message.author
const tk = await db.fetch(user.id)
const embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setColor("BLUE")
.setDescription(`${user} Thanks is \`${tk}\``)
.setTimestamp()
message.channel.send(embed)
}
});

client.on("message", async message =>{
if(message.content.startsWith(prefix + "clear")){
if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send("You Dont Have ADMINISTRATOR")
const user = message.mentions.users.first()
 await db.set(user.id, 0)
const embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setColor("BLUE")
.setDescription(`Done Cleared Thanks ${user}`)
.setTimestamp()
message.channel.send(embed)
}
});

client.on("message", async message =>{
if(message.content.startsWith(prefix + "rest")){
if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send("You Dont Have ADMINISTRATOR")
await db.clear()
const embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setColor("BLUE")
.setDescription(`Done Clear All Database`)
.setTimestamp()
message.channel.send(embed)
}
});

client.on("message", async message =>{
if(message.content.startsWith(prefix + "top")){
const value = db.valuesAll().map(e => e.join(" "))
message.channel.send(value)
}
});


     

client.login(process.env.token) 