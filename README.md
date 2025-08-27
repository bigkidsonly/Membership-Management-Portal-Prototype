# TMC Hackathon - Membership Portal

## Microservices

### Backend
The backend runs with Flask and connects to the production database (a Postgres server hosted by Supabase). The connection parameters should be added to a local `dev.env` file (which is ignored by Git). See below for the required values in the environment file:

```
# Supabase connection
export DB_HOST=< FILL IN WITH PRODUCTION CREDS >
export DB_PORT=< FILL IN WITH PRODUCTION CREDS >
export DB_DATABASE=< FILL IN WITH PRODUCTION CREDS >
export DB_USERNAME=< FILL IN WITH PRODUCTION CREDS >
export DB_PASSWORD=< FILL IN WITH PRODUCTION CREDS >

# Local Postgres connection (for development)
export DEV_DB_HOST=host.docker.internal
export DEV_DB_PORT=5432
export DEV_DB_DATABASE=tmc
export DEV_DB_USERNAME=dev
export DEV_DB_PASSWORD=823

# Runtime values
export SECRET_KEY=TMC123
export STAGE=prod
```

You can spin up a local version of the application at the command line with `make app`

### Frontend

Work in Progress