# ConnBot

A bot for gathering props and kudos in a Slack team.

<a href="https://slack.com/oauth/authorize?client_id=4420078003.319856325600&scope=commands,bot,chat:write:bot,reactions:read"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

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
  - The Slack App API ID is the ID of your app found in the URL of you app (https://api.slack.com/apps/<api-id>)
- Deploy the Serverless stack
- Use the generated API Gateway URL to populate the Interactive Components, OAuth & Permissions Redirect URL, and Event Subscription Request URL
- Add a Bot User
- Install the app in a testing account using the Manage Distribution Sharable URL (needed to trigger team persistence in DynamoDB)
