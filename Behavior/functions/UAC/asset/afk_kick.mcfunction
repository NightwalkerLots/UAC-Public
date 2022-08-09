tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti-AFK §c§lTemp Kicked§r§b §d"},{"selector":"@s"},{"text":"  for Inactivity"}]}


playsound note.bass @a ~ ~ ~
scoreboard players reset @s afktimer
event entity @s uac:ban_soft

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide