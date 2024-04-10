# Mango Challenge

# Table of Contents

1. [General Information](#general-Information)
2. [Installation](#installation)

# General Information

This project uses **Next.js** as framework in its version **14** and for its correct execution **Node.js** in its version **18.18.2** must be used.

## Linter

This project uses ESlint.

## Pre-commit tools

This project uses **lint-staged** and **@commitlint** as pre-commit tools to maintain the correct code style guide and maintain the commit structure.

## Testing tools

The project uses **Jest** and **React Testing Library** for unit testing.

# Installation

To install the project locally just run the following commands in your console:

## Clone and install dependencies

```sh
$ git clone https://github.com/degouveiadev/mango-challenge.git # To clone the repository
$ cd mango-challenge # To access the project directory
$ yarn install # To install the project dependencies
```

## Running the project

### Development environment

To run the project in the development environment

```sh
$ yarn dev
```

### Production environment

```sh
$ yarn build
$ yarn start

# Another way
$ yarn build && yarn start
```

## Runing the tests

To run the tests you must paste or write this command in your cmd

```sh
$ yarn test
```
