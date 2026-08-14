# NearZo

## Prerequisites
Before running the project locally, ensure you have:
* **Node.js** (v18 or higher) & npm
* **MongoDB** (Running locally on default port 27017 or a MongoDB Atlas connection string)
* **Docker & Docker Compose** (Optional, for containerized run)

### Clone the Repository
``` bash
git clone https://github.com/neelpatel1823/Nearzo.git
cd "Nearzo final"
```
### Install Dependencies
``` bash
npm install
```
### Start the Application
**Development mode**
```bash
npm run dev
```
**Production mode**
```  bash
npm start
```
## Access the Web Application  **http://localhost:3000/**

### Run with Docker
**Start containers**
``` bash
docker-compose up --build
```
**Run in background**
``` bash
docker-compose up -d --build
```
**Stop containers**
``` bash
docker-compose down
```





