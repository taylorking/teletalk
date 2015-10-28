# Teletalk

### What this is
This is a little node thing that will run and pipe output from your telegram bot to say on mac. This could easily be ported to something like espeak on linux.. All you need to do is change command = "say -v " to command = "espeak ... whatever"

### Usage
Create a voices .json

You must add each group name to the object in order for the object to talk in the group. Inside that object you can create users and change the default attributes for that user.. That part is optional
#### Example: 
```json
{ 
	"group_a":{ 
		"user_a":{ 
			"voice":"Diego", 
			"skipannounce":true 
		},
		"user_b":{
			"ignore":true
		}
	},
	"group_b":{}
}
```

