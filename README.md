# Teletalk

### What this is
This is a little node thing that will run and pipe output from your telegram bot to say on mac. This could easily be ported to something like speak on linux.. All you need to do is change command = "say -v " to command = "espeak ... whatever"

### Usage
Create a voices .json 

#### Example: 
```json
{ 
	"group_a":{ // Required. Allow the bot to listen on this group
		"user_a":{ // Change the default settings for a given user
			"voice":"Diego", // Set the name of the voice
			"skipannounce":true, // if you want to skip the first name says ...
			"ignore": true // if it's you or something and you don't want to hear this person
		}
}
```

