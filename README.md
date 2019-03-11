## BLB-Back-End
Baltic League Back-End REST API server based on Node.js + Express.js, and NoSQL Mongo Database.

| HTTP method | URI path | Description |
| ----------- | -------- | ----------- |
| POST | /api/users |  Add user to the database <ul><li>call with '_id' key to modify existing user</li><li>call with 'remove' to remove user</li></ul> |
| GET | /api/users |  Retrieves all users from database |
| POST | /api/teams |  Add team to the database  <ul><li>call with '_id' key to modify existing team</li><li>call with 'remove' to remove team</li></ul> |
| GET | /api/teams |  Retrieves all teams from database <ul><li>call with '_id' key to get one team</li> |
| GET | /api/teams/photo |  Retrieves photo of team |
| POST | /api/players |  Add player to the database  <ul><li>call with '_id' key to modify existing player</li><li>call with 'remove' to remove player</li></ul> |
| GET | /api/players |  Retrieves all players from database <ul><li>call with '_id' key to get one player</li> |
| GET | /api/players/photo |  Retrieves photo of player |

### Install

```sh
$ npm install
```

### Run

```sh
$ npm run dev
```

### Build

```sh
$ npm run build
```
