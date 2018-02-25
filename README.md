# ConnBot

A bot for gathering props and kudos in a Slack team.

## Usage

```
npm install -g serverless
git clone https://github.com/TheConnMan/connbot.git
cd connbot/
yarn
serverless deploy
```

## Setup
- Create a new Slack App
- Add the variables referenced in `serverless.yml` under `ssm:` to the EC2 parameter store
- Deploy the Serverless stack
- Use the generated API Gateway URL to populate the Interactive Components, OAuth & Permissions Redirect URL, and Event Subscription Request URL
- Add a Bot User
- Install the app in a testing account using the Manage Distribution Sharable URL (needed to trigger team persistence in DynamoDB)
