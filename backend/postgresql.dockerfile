FROM postgres:latest
ENV NODE_ENV=development
ENV PORT=5432
ENV POSTGRES_PASSWORD=docker
ENV POSTGRES_DB=postgresdb
EXPOSE ${PORT}

# docker run --name postgresdb -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
