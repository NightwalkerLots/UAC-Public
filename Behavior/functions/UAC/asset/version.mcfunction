#bridge-file-version: #6
tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §7[ §bUnity Anti-Cheat §2v2.8.7 §7]"}]}
scoreboard players set @s XNEZ 3892
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
