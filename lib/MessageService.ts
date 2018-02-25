import { DynamoDB } from 'aws-sdk';
import { plainToClass } from 'class-transformer';
import * as winston from 'winston';
import Message from '../model/Message';
import User from '../model/User';
import UserService from './UserService';

export default class MessageService {

  private static USER_REGEX = /<(@U[A-Z0-9]+)>/;
  private static KEYWORDS = [
    'props',
    'kudos'
  ];

  private client = new DynamoDB.DocumentClient();
  private userService = new UserService();

  public async processMessage(payload, bot) {
    try {
      if (this.textContainsKeyword(payload.event.text) && payload.event.text.match(MessageService.USER_REGEX)) {
        const userId = MessageService.USER_REGEX.exec(payload.event.text)[1];
        let user = await this.userService.getUser(userId, payload.team_id);
        if (!user) {
          winston.info(`Saving a new user ${userId} for team ${payload.team_id}`);
          user = new User(userId, payload.team_id, 0);
        }
        user.reactionCount++;
        winston.debug(`Incrementing reaction for user ${userId}`);
        await this.userService.saveUser(user);
        const message = await bot.reply(`Nice job <${userId}>!`);
        return this.saveMessage(new Message(message.ts, payload.team_id, userId));
      }
    } catch (e) {
      winston.error('Unable to process an incoming message', e);
    }
  }

  public async saveMessage(message: Message) {
    return this.client.put({
      Item: message,
      TableName: process.env.MESSAGE_TABLE_NAME
    }).promise();
  }

  public async getMessage(timestamp: string): Promise<Message> {
    const response = await this.client.get({
      Key: {
        timestamp
      },
      TableName: process.env.MESSAGE_TABLE_NAME
    }).promise();
    return plainToClass(Message, response.Item);
  }

  private textContainsKeyword(text: string): boolean {
    return MessageService.KEYWORDS.reduce((contains, keyword) => {
      return contains || text.indexOf(keyword) !== -1;
    }, false);
  }
}
