import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const { COUNTING_CHANNEL_ID, COUNTING_USER_ID, DISCORD_TOKEN } = process.env;
run().catch(console.error);

async function run () {
  const client = new Discord.Client();

  client.on('ready', () => {
    console.log('Ready!');
    console.log(`Logged in as ${client.user.id}!`);
  });

  client.on('message', async (msg) => {
    if (msg.channel.id !== COUNTING_CHANNEL_ID || msg?.member?.id === client.user.id) {
      return;
    }

    if (msg.member?.id === COUNTING_USER_ID && (msg.content.includes('RUINED IT AT') || msg.content.includes('No stats have been changed since the current number'))) {
      await sleep(5000);
      await msg.channel.send('1');
      return;
    }

    const numMessage = Number(msg.content);
    const isNumber = isNaN(numMessage) === false;

    if (isNumber === false || Number.isInteger(numMessage) === false || numMessage < -2) {
      return;
    }

    await msg.channel.send(`${numMessage + 1}`);
  });

  await client.login(DISCORD_TOKEN);
}

async function sleep (milliseconds:number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}