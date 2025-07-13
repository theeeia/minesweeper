# Minesweeper Web Application

This repository contains a full-stack implementation of the classic Minesweeper game.

## Features

- **16×16 game board** with 40 randomly placed mines  
- **Reveal** cells and **flag** suspected mines  
- **Flood-fill** logic: revealing contiguous zero-mine areas  
- **Game over** detection on mine click or victory  
- **Leaderboard**: record top 10 fastest wins (initials, time, date)  
- **Persistent storage** using PostgreSQL and Prisma  
- **GraphQL API** (NestJS + Apollo) for game state & leaderboard  
- **React + Vite** frontend with Apollo Client  

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Apollo Client, React Router  
- **Backend:** NestJS, GraphQL (Apollo), TypeScript, Prisma ORM  
- **Database:** PostgreSQL (Docker)
   
## Setup
- Start database
    `docker-compose up -d`
- Install dependencies & generate Prisma client
    `cd server`
    `npm install`
    `npx prisma db push`
    `npx prisma generate`
- Start backend server
    `npm run start:dev`
- Start frontend app
    `cd ../client`
    `npm install`
    `npm run dev`

## How to play
- Open http://localhost:5173/game in your browser
- Left-click to reveal a cell
- Right-click to toggle a flag
- When all non-mine cells are revealed or flagged, the game ends in a win
- On mine click, a game ends with a loss
- After winning, enter your initials to submit your time
- Visit /leaderboard to view the Top 10 fastest wins
    
## AI Assistance
- The core game mechanics were developed with the assistance of ChatGPT (OpenAI) 

## Notes
- Starter code was based on: https://github.com/Maximespinard/vite-nestjs-template.git
