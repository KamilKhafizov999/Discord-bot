const Discord = require("discord.js");
const config = require("./config.json");
const commands = require("./commands");
const client = new Discord.Client();

var connection = null;
var dispatcher = null;

client.login(config.token);

const prefix = "!";

var commands_list = [{
  name: "Join",
  about: "Добавить бота в звуковой канал"
},
{
  name: "disconnect",
  about: "Удалить бота из канала"
},
{
  name: "play",
  about: "Поставить музыку !play название или ссылка"
},
{
  name: "play2",
  about: "Поставить музыку !play (название или ссылка) (Громкость музыки от 0 до 1)\nприм.(!play2 навзвание песни 0.01)"
},
{
  name: "pause",
  about: "Поставить музыку на паузу"
},
{
  name: "resume",
  about: "Продолжить воспроизведение"
},
{
  name: "volume",
  about: "Громкость музыки от 0 до 1"
},
{
  name: "Stop",
  about: "Остановить музыку"
}];
//Скип музыки
//Плейлист




async function test (message) {
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    console.log(message.content)

      if(command === 'join')
      {
        connection = await message.member.voice.channel.join();
      }
      if(command === 'disconnect')
      {
          message.member.voice.channel.leave();
      }
      if(command === 'play')
      {
        console.log(message.content)
        if(!connection)
        {
          connection = await message.member.voice.channel.join();
        }

        const ytdl = require('ytdl-core');
        var YouTube = require('youtube-node');
        var youTube = new YouTube();
    
        youTube.setKey('AIzaSyBVNZyrLWdeGywwe7WDHm4OmROXHo9bb80');

        //var str = message.content.substr(message.content.lastIndexOf(' ')+1);

        if(!message.content.toLowerCase().includes("youtube.com"))
        {
          var YouTube = require('youtube-node');
          var youTube = new YouTube();
      
          youTube.setKey('AIzaSyBVNZyrLWdeGywwe7WDHm4OmROXHo9bb80');
      
          youTube.search((message.content.substring(message.content.indexOf(" ") + 1)), 2, function(error, result) {
          if (error)
            console.log(error);
          else
              dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=" + result.items[0].id.videoId, { filter: 'audioonly' }));
          });
        }
        else
        {
          dispatcher = connection.play(ytdl((message.content.substring(message.content.indexOf(" ") + 1)), { filter: 'audioonly' }));
        }
      }
      if(command === 'pause')
      {
        if(dispatcher)
          dispatcher.pause();
      }
      if(command === 'resume')
      {
        if(dispatcher)

          dispatcher.resume();
      }
      if(command === 'volume')
      {
        if(dispatcher)
          dispatcher.setVolume((message.content.substring(message.content.indexOf(" ") + 1)));
        else
         message.reply("Поставьте музыку!");
      }
      if(command === 'stop')
      {
        dispatcher.destroy();
      }
      if(command === 'help')
      {
        var helpcommands = '\n';
        commands_list.forEach(element => helpcommands+=(element.name + " - " + element.about + "\n"));
        message.reply(helpcommands);
      }
    
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);       
    }

    if(command === 'play2')
      {
        console.log(message.content)
        if(!connection)
        {
          connection = await message.member.voice.channel.join();
        }

        const ytdl = require('ytdl-core');
        var YouTube = require('youtube-node');
        var youTube = new YouTube();
    
        youTube.setKey('AIzaSyBVNZyrLWdeGywwe7WDHm4OmROXHo9bb80');

        if(!message.content.toLowerCase().includes("youtube.com"))
        {
          var YouTube = require('youtube-node');
          var youTube = new YouTube();
      
          youTube.setKey('AIzaSyBVNZyrLWdeGywwe7WDHm4OmROXHo9bb80');
      
          var vol = message.content.substr(message.content.lastIndexOf(' ')+1);

          if(vol <=1)
          {
            youTube.search((message.content.substring(message.content.indexOf(" ") + 1).replace(" "+vol, '')), 2, function(error, result) {
              if (error)
                console.log(error);
              else
                  dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=" + result.items[0].id.videoId, { filter: 'audioonly' }));
                  dispatcher.setVolume(vol);
              });
          }
          else
          {
            youTube.search((message.content.substring(message.content.indexOf(" ") + 1)), 2, function(error, result) {
              if (error)
                console.log(error);
              else
                  dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=" + result.items[0].id.videoId, { filter: 'audioonly' }));
              });
          }
          
        }
        else
        {
          if(vol <=1)
          {
            dispatcher = connection.play(ytdl((message.content.substring(message.content.indexOf(" ") + 1).replace(" "+vol, '')), { filter: 'audioonly' }));
            dispatcher.setVolume(vol);
          }
          else
          {
            dispatcher = connection.play(ytdl((message.content.substring(message.content.indexOf(" ") + 1)), { filter: 'audioonly' }));
          }
        }
      }
    if(command === 'playlist')
    {
      const ytlist = require('youtube-playlist');
      
      //const url = 'https://www.youtube.com/watch?v=2dp575wRoaw&list=PL4fGSI1pDJn5C8dBiYt0BTREyCHbZ47qc';
      const url = 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704';

      
      ytlist(url, 'url').then(res => {
        console.log(res);
        /* Array
        [ 'https://youtube.com/watch?v=bgU7FeiWKzc',
        'https://youtube.com/watch?v=3PUVr8jFMGg',
        'https://youtube.com/watch?v=3pXVHRT-amw',
        'https://youtube.com/watch?v=KOVc5o5kURE' ]
         */
      });
      

    }


    if (message.content === '!join2') {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();

            const ytdl = require('ytdl-core');
            const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { filter: 'audioonly' }));
  
            dispatcher.setVolume(0.5); // half the volume
  
            dispatcher.on('finish', () => {
            console.log('Finished playing!');
          });


        } else {
          message.reply('You need to join a voice channel first!');
        }
    }
    if (message.content === '!play2') {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();

            const ytdl = require('ytdl-core');
            const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { filter: 'audioonly' }));

            // Files on the internet
            //connection.play('http://www.sample-videos.com/audio/mp3/wave.mp3');

            // Local files
            //connection.play('/home/discord/audio.mp3');



            //dispatcher.pause();
            //dispatcher.resume();
  
            dispatcher.setVolume(0.5); // half the volume
  
            dispatcher.on('finish', () => {
            console.log('Finished playing!');
          });


        } else {
          message.reply('You need to join a voice channel first!');
        }
    }
}



client.on("message", async message => { 
    if (message.author.bot) return;
    test(message);


});


