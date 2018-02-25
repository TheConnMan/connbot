import * as winston from 'winston';
import Message from '../model/Message';
import Team from '../model/Team';
import User from '../model/User';
import MessageService from './MessageService';
import TeamService from './TeamService';
import UserService from './UserService';

export default class ReactionService {

  private messageService = new MessageService();
  private teamService = new TeamService();
  private userService = new UserService();

  public async processReaction(payload) {
    try {
      if (payload.api_app_id !== process.env.API_APP_ID) {
        return;
      }
      const team = await this.teamService.getTeam(payload.team_id);
      const message = await this.messageService.getMessage(payload.event.item.ts);
      return this.tallyReaction(message, payload.event.type === 'reaction_added');
    } catch (e) {
      winston.error('Unable to process a reaction', e);
    }
  }

  private async tallyReaction(message: Message, isAdded: boolean) {
    const user = await this.userService.getUser(message.userId, message.teamId);
    user.reactionCount += isAdded ? 1 : -1;
    return this.userService.saveUser(user);
  }
}
