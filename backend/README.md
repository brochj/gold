
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