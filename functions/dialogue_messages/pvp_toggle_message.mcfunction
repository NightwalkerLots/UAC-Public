scoreboard players add @s pvp 1
#toggle off
tellraw @s[scores={pvp=1}] {"rawtext":[{"text":"§¶§cUAC ► §6Player PVP §bhas been §cDISABLED §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={pvp=1}] ~~~ gamerule pvp false
execute @s[tag=staffstatus,scores={pvp=1}] ~~~ scoreboard players operation @a pvp = pvpdummy pvp

#toggle on
tellraw @s[scores={pvp=2}] {"rawtext":[{"text":"§¶§cUAC ► §6Player PVP §bhas been §2ENABLED §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={pvp=2}] ~~~ gamerule pvp true
execute @s[tag=staffstatus,scores={pvp=2}] ~~~ scoreboard players operation @a pvp = pvpdummy pvp
execute @s[tag=staffstatus,scores={pvp=2}] ~~~ scoreboard players set @s pvp 0

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
