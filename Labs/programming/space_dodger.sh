#!/bin/bash

# Game settings
spaceship="^"
asteroids=(" " " " " " " " " ")
spaceship_position=2
score=0
rows=5
columns=5

# Hide cursor for better display
tput civis
clear

# Draw the game board
draw_board() {
    clear
    echo "Score: $score"
    for ((i = 0; i < rows; i++)); do
        for ((j = 0; j < columns; j++)); do
            if ((i == rows - 1 && j == spaceship_position)); then
                echo -n "$spaceship "
            else
                echo -n "${asteroids[j]} "
            fi
        done
        echo ""
    done
}

# Update asteroids' positions
update_asteroids() {
    for ((j = 0; j < columns; j++)); do
        if ((RANDOM % 3 == 0)); then
            asteroids[j]="*"
        else
            asteroids[j]=" "
        fi
    done
}

# Game over check
check_game_over() {
    if [[ ${asteroids[spaceship_position]} == "*" ]]; then
        clear
        echo "Game Over! Your final score was: $score"
        tput cnorm
        exit 0
    fi
}

# Main game loop
while true; do
    draw_board
    update_asteroids
    check_game_over
    ((score++))
    
    # Read player input
    read -n 1 -s -t 0.5 key
    if [[ $key == "a" && $spaceship_position -gt 0 ]]; then
        ((spaceship_position--))
    elif [[ $key == "d" && $spaceship_position -lt columns - 1 ]]; then
        ((spaceship_position++))
    fi
done
