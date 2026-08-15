# NearZo

## Prerequisites
Before running the project locally, ensure you have:
* **Node.js** (v18 or higher) & npm
* **MongoDB** (Running locally on default port 27017 or a MongoDB Atlas connection string)
* **Docker & Docker Compose** (Optional, for containerized run)
---

### Clone the Repository
``` bash
git clone https://github.com/neelpatel1823/Nearzo.git
cd Nearzo
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
---

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
**Access the Web Application** http://localhost:3000/

---
## DataBase

Check MogoDB connected
running at port 5000
``` bash
docker-compose logs backend --tail 50
```

Access DataBase
```bash
docker-compose exec mongo mongosh
```
Run Inside Shell
```bash
show dbs
use nearzo
show collections => 'products'
db.products.find({},{image:0})
```
---





