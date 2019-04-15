## BLB-Back-End
Baltic League Back-End REST API server based on Node.js + Express.js, and NoSQL Mongo Database.

| HTTP method | URI path | Description |
| ----------- | -------- | ----------- |
| POST | /api/users |  Add user to the database <ul><li>call with '_id' key to modify existing user</li><li>call with 'remove' to remove user</li></ul> |
| GET | /api/users |  Retrieves all users from database/finds users by criteria in request |
| POST | /api/users/authenticate | Return token which have to be in x-access-token header for permited access |
| POST | /api/teams |  Add team to the database  <ul><li>call with '_id' key to modify existing team</li><li>call with 'remove' to remove team</li></ul> |
| GET | /api/teams |  Retrieves all teams from database/finds users by criteria in request  |
| GET | /api/teams/photo |  Retrieves photo of team |
| POST | /api/players |  Add player to the database  <ul><li>call with '_id' key to modify existing player</li><li>call with 'remove' to remove player</li></ul> |
| GET | /api/players |  Retrieves all players from database/finds users by criteria in request  |
| GET | /api/players/photo |  Retrieves photo of player |
| POST | /api/matches |  Add match to the database  <ul><li>call with '_id' key to modify existing</li><li>call with 'remove' to remove</li></ul> |
| GET | /api/matches |  Retrieves all matches from database/finds users by criteria in request  |
| POST | /api/news | Add news to the database <ul><li>call with '_id' key to modify existing</li><li>call with 'remove' to remove</li></ul> |
| GET | /api/news | Retrieves news feed <ul><li> call with 'limit' to set limid(default 15)</li></ul> |
| GET | /api/news/fetchFB | Retrieves news feed from fb <ul><li> pass access-token as 'fbAccessToken'</li><li> pass page id as 'fbPageID' </ul> |

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
