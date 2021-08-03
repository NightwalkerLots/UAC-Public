hide
#unban window system
execute @s[tag=staffstatus,scores={unban=1}] ~~~ scoreboard players set @a Ban 0
execute @s[tag=staffstatus,scores={unban=1}] ~~~ scoreboard players remove @s unbantimer 1
execute @s[tag=staffstatus,scores={unban=1,unbantimer=0..15}] ~~~ scoreboard players set @s hometp 3
execute @s[tag=staffstatus,scores={unban=1,unbantimer=0..8}] ~~~ scoreboard players set @s unban 0
execute @s[tag=staffstatus,scores={unban=0}] ~~~ scoreboard players reset @s unbantimer
