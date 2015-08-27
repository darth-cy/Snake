# Snake #
This is the classical snake game developed using DOM div elements and CSS3 class toggle. It functions with keypress events and has intuitive controls.

### Sample Screenshot ###
![snake]

[snake]: ./images/snake.png

### Development Process ###
+ Use CSS to align DOM elements so they form a grid system.
+ Implement game logic. This includes making an array for the snake object to store its locations and writing the random generation process of apples.
+ Integrate game logic with DOM elements. Each DOM grid is drawn by first checking the current state of the grid with the game class. Then, according to the state, I render it as a snake segment or an empty grid.
+ Bind keyboard events. Mostly the game on top of keyup and keydown events.

### How to Run ###
Follow the live link of this game here: [live]
[live]: http://razynoir.github.io/snake/

### Development Highlights ###
+ Floating Scheme: Unlike Candy Crush which requires sliding of absolutely positioned HTML divs, snake operates on a fixed grid system, therefore, it's more sensible to put all divs as floating elements inside a fixed box.
+ Detection: The keyup and keydown events are binded to the window so the environment can correctly identify keystroke commands.
+ Do Not Turn Back: To prevent turning back into yourself, the snake checks if the new direction plus the head will equal to the second segment of itself. This is different from the conventional checking which checks if the new direction is different from the current direction.
+ Coord Class: The coordinate utility is also streamlined into a Coord class that deals with vector operations.

### Future Development Considerations ###
+ Graphical interface. It is possible to place images onto the grid. We only need to know if a grid is the snake's head or middle segment, then we can even animate the head for more interactive features.
