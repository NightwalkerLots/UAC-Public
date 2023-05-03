function UAC/asset/echestwipe
clear @s
scoreboard players add @s warn 1

scoreboard players set @s lstcmd 19

tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§cHas been inventory/echest wiped and warned"}]}
playsound note.bass @a ~ ~ ~
execute @s[scores={warn=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou have been Warned [1/3]"}]}
execute @s[scores={warn=2}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou have been Warned. Your next warning will result in a Season Ban. [2/3]"}]}

function UAC/stats

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
