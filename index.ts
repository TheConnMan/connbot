import 'reflect-metadata';

import * as slack from 'serverless-slack';
import MessageService from './lib/MessageService';
import ReactionService from './lib/ReactionService';
import SlashCommandService from './lib/SlashCommandService';

exports.handler = slack.handler.bind(slack);

const messageService = new MessageService();
const reactionService = new ReactionService();
const slashCommandService = new SlashCommandService();

slack.on('message', (payload, bot) => {
  messageService.processMessage(payload, bot);
});

// Reaction Added event handler
slack.on('reaction_added', (msg, bot) => {
  reactionService.processReaction(msg);
});

// Reaction Added event handler
slack.on('reaction_removed', (msg, bot) => {
  reactionService.processReaction(msg);
});

// Reaction Added event handler
slack.on('/connbot', async (msg, bot) => {
  try {
    await slashCommandService.process(msg, bot);
  } catch (e) {
    console.log(e);
  }
});
