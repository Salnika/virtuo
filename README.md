## Technical test Virtuo

This project is a simple server that manage cars and stations

### Set up

#### Project
To setup the project you need to run the command `npm install`

#### Database
Prerequisite: Docker
You need to start the database with `docker-compose up`
You can init the databe with `npm run db:init`

##### Other databases commands: 
Run latest migrations :  `npm run db:migrate`
Reset the database : `npm run dev:db:reset`

### Routes

Stations
```
POST: Create a new station
Parameters: 
body: {
  name: string of at least 3 char
}
Return: New created station
GET: Get station informations
Parameters: 
query: {
  id: integer
}
Return: The station with it cars
PUT: Update a station
Parameters: 
body: {
  id: integer
  name: string of at least 3 char
}
Return: The updated station
DELETE: Delete a station
Parameters: 
query: {
  id: integer
}
Return: OK
```

Cars
```
POST: Create a new car
Parameters: 
body: {
  name: string of at least 3 char
  stationId: integer
}
Return: New created car
GET: Get car informations
Parameters: 
query: {
  id: integer
}
Return: The car with it station
PUT: Update a car
Parameters: 
body: {
  id: integer
  name: string of at least 3 char - optionnal
  stationId: integer - optionnal
}
Return: The updated car
DELETE: Delete a car
Parameters: 
query: {
  id: integer
}
Return: OK
```
