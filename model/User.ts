export default class User {

  constructor(public id: string, public team: string, public reactionCount: number) {
    this.id = id;
    this.team = team;
    this.reactionCount = reactionCount;
  }
}
