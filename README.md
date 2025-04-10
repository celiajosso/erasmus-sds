# Erasmus+ SDS project

## Roles and Responsibilities

- Samuel PONZO (Product Owner) is reponsible for:
  - creating the product backlog
- Célia JOSSO : Scrum Master; is reponsible for...
  - creating the Discord Server (channels, roles, webhook)
  - enabling the Github repository (Github Projects)
  - making sure the communication works
  - making sure we organize retrospectives
  - inproving the frontend
  - update the documentation
  - map ??
- Elouan LECORGNE (Developer) is reponsible for:
- Tommi LUCAS (Developer) is reponsible for:

- Filip VUJEVA (Developer) is reponsible for...
  - maintaining the CI/CD pipeline and ensuring the connection between instances
  - developing basic backend functionalities

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
