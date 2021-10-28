
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