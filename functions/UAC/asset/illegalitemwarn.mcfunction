scoreboard players add @s warnillegal 1
playsound random.break @s ~ ~ ~
execute @s[scores={warnillegal=3}] ~~~ scoreboard players add @s warn 1
execute @s[scores={warnillegal=6}] ~~~ scoreboard players add @s warn 1
execute @a[scores={warnillegal=9..100}] ~~~ tag @s add illegalitemban

execute @s[scores={warn=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou have [1/3]"}]}
execute @s[scores={warn=2}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou have been Warned. Your next warning will result in a Season Ban. [2/3]"}]}


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
