# TicTacToe Domain Layer using Domain Driven Design in Typescript

This is an implementation with typescript of the Domain Layer of the popular game of TicTacToe (aka OXO) using Domain Driven Design.

## 1. Clean Architecture typical representation

In this project we will only focus on the domain layer, the inner layer of the clean architecture

![Clean Architecture](Assets/CleanArchitecture.png)

Another representation of the clean architecture, including the Database system

![Clean Architecture Alt Rep](Assets/CleanArchitecture-AltRep.png)

More detailed

![Clean Architecture More Detailed](Assets/CleanArchitecture-Detailed.png)

## 2. Domain Representation

We have two bounded contexts: __TicTacToe Game__ and our __Authentication System__.

Is the TicTacToe context where our game will be implemented, and in the user's contexts, we will implement actions of login

```mermaid
---
title: Bounded Contexts
---

flowchart LR
  subgraph ide1 [TicTacToe Game]
  GAME --- BOARD
  GAME --- PLAYER
  BOARD --- PIECE
  end
  PLAYER --- USER
  subgraph ide2 [Authentication System]
  USER --- LOGIN
  end

```
