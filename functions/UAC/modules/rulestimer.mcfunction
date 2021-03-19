#Automated Rules Message 10Mins
#(v1.5)No longer needs to be automated cause of the UI
execute @r[scores={rtmtoggle=1}] ~~~ scoreboard players add @r rulestimer 1
execute @r[scores={rulestimer=10000}] ~~~ function UAC/rules
execute @r[scores={rulestimer=10010}] ~~~ scoreboard players reset @r rulestimer

#Adds a tag for the enabled/disabled check
execute @r[scores={rtmtoggle=1}] ~~~ scoreboard players set @r RTM 1
execute @r[scores={rtmtoggle=0}] ~~~ scoreboard players set @r RTM 0
scoreboard players operation @r rtmtoggle = rtmtoggledummy rtmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
