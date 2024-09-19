# RandomWheel
By Robert Kilkenny

## Description
 Making a simple website page that will spin a wheel automatically on load by having the elements sent via the URL. The idea for this is that the url will be written ahead of time, and then the user will click on the link and it will automatically play.

## How to use it
You can add an element to the list of options by adding them to the search bar using `/?elements=` followed by the elements you want to spin against. If you just want the name with a random color, you just need to put the name and a comma to delimitate the different enteries `choice 1, these, winner`. However, if you want to add a color, you need to add a hypen before the name using Hex code without the `#` character like this `F00-red,0F0-Green,00F-Blue` (you can use this [website](https://htmlcolorcodes.com/) or many others for help choosing a color!).

For example, if you want to choose between 
- McDonalds (Red)
- Burger King (Yellow)
- Subway (Green)
- Diary Queen (Blue)
- Leftovers (No specific color)

You would add [https://robertkilkenny.github.io/Random-Wheel/?elements=F00-McDonalds,FF0-Burger King,0F0-Subway,0001F6-Diary Queen,Leftovers](https://robertkilkenny.github.io/Random-Wheel/?elements=F00-McDonalds,FF0-Burger%20King,0F0-Subway,0001F6-Diary%20Queen,Leftovers) to the search bar.