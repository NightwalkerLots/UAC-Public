execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §ctried passing the world border. Their spawn has been reset."}]}
execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=0}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §ctried passing the world border"}]}

#Logic for custom world spawn from Fine Tuning file
execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=1}] ~~~ scoreboard players operation @s X_Coord_S = @s Worldx
execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=1}] ~~~ scoreboard players operation @s Y_Coord_S = @s Worldy
execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=1}] ~~~ scoreboard players operation @s Z_Coord_S = @s Worldz
execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=1}] ~~~ scoreboard players set @s teleporting_home 1

#Without custom world spawn / default spawn
execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=0}] ~~~ tp @s 0 95 0
execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=0}] ~~~ effect @s slow_falling 10 1 true


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
