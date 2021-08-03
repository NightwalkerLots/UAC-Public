tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► §d"},{"selector":"@s"},{"text":" §¶§bhas been banned by a Operator"}]}
scoreboard players set @s Ban 1

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
