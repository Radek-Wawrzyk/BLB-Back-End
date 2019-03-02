## BLB-Back-End
Baltic League Back-End REST API server based on Node.js + Express.js, and NoSQL Mongo Database.

| HTTP method | URI path | Description |
| ----------- | -------- | ----------- |
| POST | /api/users |  Add user to the database |
| GET | /api/users |  Retrieves all users from database |
| POST | /api/teams |  Add team to the database  <ul><li>call with 'id' key to modify existing team</li><li>call with 'remove' to remove team</li></ul> |
| GET | /api/teams |  Retrieves all teams from database |
| GET | /api/teams/photo |  Retrieves photo of team |

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
