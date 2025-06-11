# Erasmus+ SDS project

## Roles and Responsibilities

- Samuel PONZO (Product Owner) is responsible for:
  - creating the product backlog
  - creating the sprint backlog
  - updating the github project if needed
  - doing some planning poker
  - collaborating tighly with developpers to ensure the sprint goals are achievable
  - calculating the burn down chart
  - doing Gantt chart
  - estimating the velocity of the team and taking that into account when doing the sprint backlog
  - putting the priorities to the right features
    
- Célia JOSSO (Scrum Master) is responsible for:
  - creating the Discord Server (channels, roles, webhook)
  - enabling the Github repository (Github Projects)
  - making sure the communication works
  - making sure we organize retrospectives
  - organizing an additionnal meeting on wednesdays
  - doing/improving the frontend
  - update the documentation
  - loading data via json file (rather than sql requests)
  - cleaning up the code and organize it better
  - contacting and informing the teacher if needed
  - fixing some bugs
  - adding places
    
- Elouan LECORGNE (Developer) is responsible for:
  - adding the favorite feature
  - adding the playlists feature
    
- Tommi LUCAS (Developer) is responsible for:
  - creating account system (registration, login...)
  - adding prices to places
  - adding durations to places
  - fixing some details
    
- Filip VUJEVA (Developer) is reponsible for:
  - maintaining the CI/CD pipeline and ensuring the connection between instances
  - developing basic backend functionalities
  - AI based recommendatiosn
  - setup the project
  - frontend

## Comunication stategies

- Discord Server
- Github Projects, Github issues...

## Installation manual
1. Requirements
  -   having a not too high java version (17 is ok, 21 is too high) 
  -   have node and npm
  -   have a Docker environment

Do the following steps in 3 different terminals.

2. Run the app
Run the file named `TravelPlannerApplication.java`

3. Run the database
```bash
cd backend
docker compose up
```
4. Run the frontend
```bash
cd frontend
npm start
```

Now the database, frontend and backend are running on your local machine. You can access 
- frontend: localhost:3000
- backend: localhost:8080
