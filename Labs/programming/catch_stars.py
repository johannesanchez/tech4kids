import random
import time
import os

# Game settings
columns = 10  # width of the playing area
basket_position = columns // 2  # start basket in the middle
score = 0
stars = []

# Draw the game board
def draw_board():
    os.system("clear")  # Clear the screen for each frame
    print("Catch the Falling Stars! Use 'a' to move left and 'd' to move right.")
    print(f"Score: {score}")
    
    # Draw stars
    for i in range(10):
        row = [" "] * columns
        for star in stars:
            if star[1] == i:
                row[star[0]] = "*"
        print("".join(row))
    
    # Draw basket at the bottom
    row = [" "] * columns
    row[basket_position] = "^"
    print("".join(row))

# Update positions of falling stars
def update_stars():
    global score
    for star in stars:
        star[1] += 1
    stars[:] = [star for star in stars if star[1] < 10]  # Remove stars that reach the bottom
    
    # Check for collision with basket
    for star in stars:
        if star[1] == 9 and star[0] == basket_position:
            score += 1
            stars.remove(star)

# Main game loop
try:
    while True:
        draw_board()
        
        # Add a new star at a random position
        if random.randint(1, 5) == 1:  # Adjust the frequency of falling stars
            stars.append([random.randint(0, columns - 1), 0])

        # Update star positions
        update_stars()

        # Get player input
        key = input("Move (a/d): ")
        if key == "a" and basket_position > 0:
            basket_position -= 1
        elif key == "d" and basket_position < columns - 1:
            basket_position += 1

        time.sleep(0.2)  # Slow down the game

except KeyboardInterrupt:
    print("\nGame Over! Your final score was:", score)
