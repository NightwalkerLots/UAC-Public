//This is not meant to be seen

##(Note: tpmtoggle is not needed due to it being already executed from the first location)

##Original Tick <- This will help keep track of the timer
scoreboard players add @s timeplayedtick 1

##Converting to seconds
scoreboard players add @s[scores={timeplayedtick=20..}] timeplayedsec 1
scoreboard players set @s[scores={timeplayedtick=20..}] timeplayedtick 0

##Converting to minutes
scoreboard players add @s[scores={timeplayedsec=60..}] timeplayedmin 1
scoreboard players set @s[scores={timeplayedsec=60..}] timeplayedsec 0

##Converting to hours
scoreboard players add @s[scores={timeplayedmin=60..}] timeplayedhr 1
scoreboard players set @s[scores={timeplayedmin=60..}] timeplayedmin 0

##Converting to days
scoreboard players add @s[scores={timeplayedhr=24..}] timeplayedday 0
scoreboard players set @s[scores={timeplayedhr=24..}] timeplayedhr 0

## (Currently 9/30 Commands) <- (This will help me keep track of limitations for each file for preventing lag)//