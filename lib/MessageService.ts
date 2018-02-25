import { DynamoDB } from 'aws-sdk';
import { plainToClass } from 'class-transformer';
import Message from '../model/Message';
import User from '../model/User';
import UserService from './UserService';

export default class MessageService {

  private static USER_REGEX = /<(@U[A-Z0-9]+)>/;

  private client = new DynamoDB.DocumentClient();
  private userService = new UserService();

  public async processMessage(payload, bot) {
    try {
      if (payload.event.text.indexOf('props') !== -1 && payload.event.text.match(MessageService.USER_REGEX)) {
        const userId = MessageService.USER_REGEX.exec(payload.event.text)[1];
        let user = await this.userService.getUser(userId);
        if (!user) {
          user = new User(userId, payload.team_id, 0);
        }
        user.reactionCount++;
        await this.userService.saveUser(user);
        const message = await bot.reply(`Nice job <${userId}>!`);
        return this.saveMessage(new Message(message.ts, payload.team_id, userId));
      }
    } catch (e) {
      console.log(e);
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
}
