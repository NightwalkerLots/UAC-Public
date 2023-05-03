execute @s[tag=!theif] ~~~ scoreboard players set @s[tag=Ban] Ban 1
execute @s[tag=!theif,scores={Ban=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► §d"},{"selector":"@s"},{"text":" §¶§bhas been banned by a Operator"}]}
execute @s[tag=!theif,tag=PermBan] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► §d"},{"selector":"@s"},{"text":" §¶§bis UAC Global Banned and may not join"}]}
function UAC/asset/ban_check_asset
playsound note.bass @a ~ ~ ~

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
