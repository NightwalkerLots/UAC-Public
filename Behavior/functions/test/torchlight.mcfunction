scoreboard players set @s hastorch 1

execute @s[scores={hastorch=1}] ~~~ fill ~1 ~-1 ~3 ~7 ~4 ~-3 air 0 replace light_block
execute @s[scores={hastorch=1}] ~~~ fill ~-1 ~-1 ~3 ~-7 ~4 ~-3 air 0 replace light_block
execute @s[scores={hastorch=1}] ~~~ fill ~3 ~-1 ~-7 ~-3 ~4 ~-1 air 0 replace light_block
execute @s[scores={hastorch=1}] ~~~ fill ~3 ~-1 ~7 ~-3 ~4 ~1 air 0 replace light_block
execute @s[scores={hastorch=1}] ~~~ detect ~ ~ ~ air 0 execute @s ~~~ detect ~ ~1 ~ air 0 fill ~ ~ ~ ~ ~1 ~ light_block 9
#execute @s[scores={torchtimer=20..25,hastorch=1}] ~~~ scoreboard players reset @s torchtimer
#execute @s[scores={hastorch=1}] ~~~ scoreboard players set @s hastorch 0

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
