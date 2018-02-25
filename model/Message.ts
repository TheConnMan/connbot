export default class Message {

  constructor(public timestamp: string, public teamId: string, public userId: string) {
    this.teamId = teamId;
    this.userId = userId;
  }
}
