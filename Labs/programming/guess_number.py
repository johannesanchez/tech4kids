import random

print("Welcome to the Number Guessing Game!")
print("I'm thinking of a number between 1 and 100.")

# Generate a random number between 1 and 100
number_to_guess = random.randint(1, 100)
attempts = 0

while True:
    # Get player's guess
    guess = input("Enter your guess: ")
    
    # Make sure the input is a number
    if not guess.isdigit():
        print("Please enter a valid number!")
        continue

    # Convert guess to an integer
    guess = int(guess)
    attempts += 1

    # Check if the guess is correct
    if guess < number_to_guess:
        print("Too low! Try again.")
    elif guess > number_to_guess:
        print("Too high! Try again.")
    else:
        print(f"Congratulations! You guessed the number in {attempts} attempts.")
        break
