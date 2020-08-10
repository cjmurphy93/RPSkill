# RPSkill

## Overview

RPSkill is a web application that allows users to participate in games of RPS with other users in real time. Users skill will be tracked internally via an ELO implementation. Users will also be able to track their match history, add friends (and view the online status of their friends) and view the leaderboard. Games will take place in a live server which utilizes web sockets to transfer information.

## How does it work? 

Users simply need to sign up for an account and be logged in to participate! ELO will automatically be tracked, and all games will be taken into account. 

## Who is it for? 

Everyone!

# Technologies Used

RPSkill utilizes the MERN-stack. (MongoDB, Express.js, React.js, Node.js)

# Functionality & MVP

MVP 1: A Functional Rock, Paper Scissors Game

MVP 2: A Server that can host two players simultaneously and relay information between them in real time. The server will also be responsible for distributing point deductions / gain after a game has concluded.

MVP 3: A Friends List that allows for the ability to send requests to other users and challenge directly. 

MVP 4: A public leaderboard that allows for signed in and non signed in users to view who has the highest rating. 

## Bonus Features

MVP 5: Add a chat functionality to Friends List.

MVP 6: Tournament functionality (Receives up to 16 players, or auto starts after a given time limit has been exceeded, generates a tournament table)

