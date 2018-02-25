// Include the serverless-slack bot framework
import * as slack from 'serverless-slack';

// The function that AWS Lambda will call
exports.handler = slack.handler.bind(slack);

// Slash Command handler
slack.on('/greet', (msg, bot) => {
  const message = {
    attachments: [{
      actions: [
        { type: 'button', name: 'Wave', text: ':wave:', value: ':wave:' },
        { type: 'button', name: 'Hello', text: 'Hello', value: 'Hello' },
        { type: 'button', name: 'Howdy', text: 'Howdy', value: 'Howdy' },
        { type: 'button', name: 'Hiya', text: 'Hiya', value: 'Hiya' }
      ],
      callback_id: 'greetings_click',
      fallback: 'actions'
    }],
    text: 'How would you like to greet the channel?'
  };

  // ephemeral reply
  bot.replyPrivate(message);
});

// Interactive Message handler
slack.on('greetings_click', (msg, bot) => {
  const message = {
    // selected button value
    text: msg.actions[0].value
  };

  // public reply
  bot.reply(message);
});

// Reaction Added event handler
slack.on('reaction_added', (msg, bot) => {
  bot.reply({
    text: ':wave:'
  });
});
