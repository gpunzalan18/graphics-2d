Grace Punzalan
Graphics - 2D Game Features
2017.03.23

1.	Rocket science (left, right, up and down arrows)
2.	Tilt (shows when rocket is moving; when the engines are off, the rocket slowly goes back to its upright position)
3.	Dense atmosphere (apparent when the engines JUST turned off)
4.	Orthocam (follows the rocket)
5.	Afterburner (Only shows up when engines are on)
6.	Exhaust plasma (shows up when engines are on)
7.	Lucy in the sky (only 3 diamonds can be collected; when the diamonds go out of range, they are repositioned at the top of the screen) 
8.	Great balls of fire (one fireball object that is always repositioned around the top left corner of the screen once it’s out of range; it starts off the with scale (0,0,0) and increases as it goes through the screen
9.	Platforms (only 2 platforms in the game)
10.	Landing strip (Platforms can only be landed on if the velocity is negative; if not, the avatar can pass through the platforms)
11.	BOOM! (Occurs when the avatar collides with the fireball and the platform (when the velocity is too fast or if the orientation of the avatar is not upright)
12.	Minimap (drawing on a smaller viewport located  at the left corner of the screen; the highlight on the minimap is implemented through CSS— I have a minimap canvas that has an opacity of .25)
13.	Pokeball (on click, the avatar able to shoot a pokeball towards the cursor (even if it’s flying). However, the rocket cannot shoot a pokeball once the pokemon is captured.)
14.	Flamethrower (on mousedown, the avatar can shoot fireball but if and only if the pokemon is already captured)
15.	Pokemon (can be collected when the avatar or a pokeball collides with it; once captured, the image of the pokemon is displayed at the right bottom corner of the screen)

OTHER NOTES: 
1. The user loses a life when boom is activated or if the avatar falls out of Jupiter (brown image in the background) only when gravity is acting upon it. 
2. Issue with platform, if the avatar has landed on any of the platform and moves left or right, its orientation changes and that activates the boom multiple times until the orientation is upright. However, it looks like the player lose all of his life if this occurs. 
3. My project also has a problem when resizing the browser (firefox) to full screen—only ¼ th of the screen is displayed. List of errors listed on the console:
•	“Error: WebGL: texImage2D: Conversion requires pixel reformatting.”
•	“Error: WebGL: drawElements: Drawing to a destination rect smaller than the viewport rect.”
I wasn’t really sure how to fix this problem. But all of my features work when the browser window is smaller. Please let me know if you have any questions. 

Thank you,
Grace

