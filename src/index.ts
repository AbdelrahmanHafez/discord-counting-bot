import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const { COUNTING_CHANNEL_ID, DISCORD_TOKEN } = process.env;
const ONE_HOUR_IN_MILLISECONDS = 3.6e+6;

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

    const numMessage = Number(msg.content);
    const isNumber = isNaN(numMessage) === false;

    if (isNumber === false || Number.isInteger(numMessage) === false || numMessage < -2) {
      return;
    }

    await msg.channel.send(`${numMessage + 1}`);
  });

  await client.login(DISCORD_TOKEN);

  await sleep(ONE_HOUR_IN_MILLISECONDS);
  process.exit(0);
}

async function sleep (milliseconds:number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}