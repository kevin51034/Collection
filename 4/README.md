#Flashcards

This is the Flashcard web app that loads desks of flashcards for the user to review and score themselves.


Menu screen(initial)
The flashcard menu items are taken from the titles in 'constants.js'.
The menu items would appear in the order they appear in the 'FLASHCARD_DECKS' array,and it will work even if user changed the values of 'FLASHCARD_DECKS'


Click flashcard
The front side of the card is the 'word'
The back side of the card is the 'denifition'
(also,the user can define by themself)


Drag flashcard
If the user remember 'denifition' of the 'word' they can Drag to right side mean that they understand the denifition of the word.
If the user forget 'denifition' of the 'word' they can Drag to left side mean that they forget the denifition of the word.
If the user drags the card less than 150px from origin in the x-direction , the card will back to the middle area.

Results screen
Display the percentage correct, the number correct, and the number incorrect for this flashcard deck.

If the user got less than a perfect score(100%), the first button (with a class of 'continue') would say “Continue”
Clicking “Continue” will then go back to the Flashcard screen, but with only the flashcards the user got wrong.
The stats at the end of every round should still be out of the total number of flashcards in the deck. For example, if the first round you got 3/5 flashcards correct, and you continue, you will get presented with the 2 cards you got incorrect. If you get those 2 cards correct, the stats will show you’ve gotten “5” cards correct, since that is the total number of cards in the deck.

If the user got a perfect score, the first button (with a class of 'continue') would say “Start over?”
Clicking “Start over?” will go back to the menu
