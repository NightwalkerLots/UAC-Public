execute @s[scores={wbmtoggle=1,welcomed=1,Border_Coord_X=1..}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §ctried passing the world border"}]}
execute @s[scores={wbmtoggle=1,welcomed=1}] ~~~ tp @s[scores={Border_Coord_X=1..}] 245 75 -260


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
