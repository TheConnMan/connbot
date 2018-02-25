import User from '../model/User';
import UserService from './UserService';

export default class SlashCommandService {

  private userService = new UserService();

  public async process(msg, bot) {
    const text = await this.getResponse(msg);
    bot.replyPrivate(text);
  }

  private async getResponse(msg): Promise<string> {
    if (msg.text === 'list') {
      const users = await this.userService.listUsers(msg.team_id);
      return 'Users by kudos count:\n' + users.sort((u1, u2) => {
        return u2.reactionCount - u1.reactionCount;
      }).map((user) => `<${user.userId}>: ${user.reactionCount} kudos`).join('\n');
    }
    return [
      'ConnBot Help',
      ' - list: List the kudos leader board'
    ].join('\n');
  }
}
