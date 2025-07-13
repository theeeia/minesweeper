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


## AI Assistance
- The core game mechanics were developed with the assistance of ChatGPT (OpenAI) 