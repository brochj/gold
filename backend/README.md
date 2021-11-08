Create Database

```sh
sudo docker run --name postgresdb -e POSTGRES_PASSWORD=docker -d postgres
```

Abrir o postbird e conectar e criar o database

> IMPORTANTE: O nome da database que está no arquivo `config/database` deve ser o mesmo nome de quando for criar o database dentro do Postbird.

Criar as tabelas

```sh
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

## Test the API routes

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Diet%20App%20API&uri=https%3A%2F%2Fgist.githubusercontent.com%2Fbrochj%2F6fcb9495af9ed7df10cee44cac5dfdf5%2Fraw%2Fe89b021e9605c41530ada42f6c6a34797bf4eba0%2FDiet-app-API-insomniaV4.json)

## Running two containers manually

### 1. Running the database

#### Build the image

```sh
[broch-pc backend]> docker build -f postgresql.dockerfile -t mypostgres .
```

#### Run the container

```sh
[broch-pc backend]> docker run --name mypostgresDB -p 5432:5432 -d mypostgres
```

### 2. Running the Nodejs API

#### Build the image

```sh
[broch-pc backend]> docker build -f nodejs.dockerfile -t nodedietapi .
```

### Run the container

```sh
[broch-pc backend]> docker run --name dietappapi -d -p 3333:3333 nodedietapi
```

## Runnig with docker-compose

Open your terminal inside `backend` folder, then run the following commands:

```sh
docker-compose build
```

```sh
docker-compose up
```

Open another terminal and access Nodejs container terminal to populate de database:

```sh
docker exec -it dietappapi bash
root@2caf89e77c13:/usr/app# npm run seed
```

### Stop all containers and keep data

```sh
docker-compose stop
```

### Start all containers

```sh
docker-compose start
```

### WARNING: `docker-compose down` will remove all containers, therefore, its data!

---

<details><summary>More Docker-compose commands</summary>

### Docker-compose commands

| Command   | Description                                |
| --------- | ------------------------------------------ |
| `build`   | Build or rebuild services                  |
| `up`      | Create and start containers                |
| `stop`    | Stop services                              |
| `start`   | Start services                             |
| `restart` | Restart containers                         |
| `down`    | Stop and **remove containers**, networks   |
| `rm`      | Removes stopped service containers         |
| `kill`    | Force stop service containers.             |
| `ls`      | List running compose projects              |
| `exec`    | Execute a command in a running container.  |
| `top`     | Display the running processes              |
| `ps`      | List containers                            |
| `port`    | Print the public port for a port binding.  |
| `images`  | List images used by the created containers |
| `run`     | Run a one-off command on a service.        |
| `pause`   | pause services                             |
| `unpause` | unpause services                           |

</details>
