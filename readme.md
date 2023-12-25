# Delliv

## System Requirements

- Docker
- Node.js (version 18 or later)
- Yarn

## Installation

1. **Install Docker:**
   - Follow the instructions at [Get Docker](https://docs.docker.com/get-docker/).

2. **Install Node.js:**
   - Node.js can be downloaded from [Node.js official website](https://nodejs.org/en/download/).

3. **Install Yarn:**
   - Instructions for Yarn installation can be found on the [Yarn official website](https://yarnpkg.com/lang/en/docs/install/).

## Running the Application

A `Makefile` is included to streamline the process of managing the service lifecycle and database operations. Below are the steps to build, run, and stop the application:

Note: You can use the email test@example.com with the password 123456 to log in.

### Starting the Services

```bash
make up
```

### Run Database Migrations

```bash
make migrate
```

### Run Database Seed

```bash
make seed
```

### Stop and Remove Containers

```bash
make down
```
