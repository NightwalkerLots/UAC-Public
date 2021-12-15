scoreboard objectives add CBEBU dummy 
scoreboard objectives add CBECO dummy 
scoreboard objectives add BBMCC dummy 

scoreboard objectives add Worldx dummy
scoreboard objectives add Worldy dummy
scoreboard objectives add Worldz dummy
scoreboard objectives add worldcustom dummy


scoreboard players operation @a pvp = pvpdummy pvp
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
