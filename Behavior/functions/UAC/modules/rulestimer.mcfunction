#Automated Rules Message 10Mins
#(v1.5)No longer needs to be automated cause of the UI
execute @s[scores={rtmtoggle=1}] ~~~ scoreboard players add @s rulestimer 1
execute @s[scores={rulestimer=10000}] ~~~ function UAC/rules
execute @s[scores={rulestimer=10010}] ~~~ scoreboard players reset @s rulestimer


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
