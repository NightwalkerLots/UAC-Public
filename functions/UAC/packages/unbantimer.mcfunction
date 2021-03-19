#Unban window ticker
scoreboard objectives add unbantimer dummy unbantimer
execute @r[tag=staffstatus] ~~~  execute @a[tag=unbanwindow] ~~~ scoreboard players remove @a[tag=staffstatus] unbantimer 1

#Adds unban to everyone while unbanwindow tag is on
execute @r[tag=unbanwindow] ~~~ tag @a add unban

#Window Close message
execute @r[tag=unbanwindow] ~~~ execute @s[scores={unbantimer=10..12}] ~~~ tellraw @a[tag=staff] {"rawtext":[{"text":"§¶§c►UAC - The unban window has ended"}]}
execute @r[tag=staffstatus] ~~~ execute @s[scores={unbantimer=1..10}] ~~~ gamerule sendcommandfeedback true

#Remove the unban tag when window closes
execute @r[tag=staffstatus] ~~~ execute @a[tag=unbanwindow] ~~~ execute @s[scores={unbantimer=1..10}] ~~~ tag @a remove unban
execute @r[tag=staffstatus] ~~~ execute @a[tag=unbanwindow] ~~~ execute @s[scores={unbantimer=1..10}] ~~~ tag @a remove unbanwindow


#Prevents unbantimer score to going super into the nagatives.
execute @r[tag=staffstatus] ~~~ execute @a[tag=!unbanwindow] ~~~ scoreboard players reset @s unbantimer



#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
