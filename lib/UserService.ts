import { DynamoDB } from 'aws-sdk';
import { plainToClass } from 'class-transformer';
import User from '../model/User';

export default class UserService {

  private client = new DynamoDB.DocumentClient();

  public async saveUser(user: User) {
    return this.client.put({
      Item: user,
      TableName: process.env.REACTIONS_TABLE_NAME
    }).promise();
  }

  public async getUser(id: string): Promise<User> {
    const response = await this.client.get({
      Key: {
        id
      },
      TableName: process.env.REACTIONS_TABLE_NAME
    }).promise();
    return plainToClass(User, response.Item);
  }
}
