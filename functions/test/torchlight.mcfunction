#scoreboard players add @s torchtimer 1

#execute @s[scores={torchtimer=9}] ~~~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace light_block
fill ~ ~ ~ ~ ~1 ~ light_block 8
#execute @s[scores={torchtimer=10..11}] ~~~ scoreboard players reset @s torchtimer

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
