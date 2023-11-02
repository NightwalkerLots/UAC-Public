#execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §ctried passing the world border. Their spawn has been reset."}]}
execute @s[scores={wbmtoggle=1,welcomed=1,has_gt=0}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §ctried passing the world border"}]}
playsound note.bass @a ~ ~ ~


#Without custom world spawn / default spawn
execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=0}] ~~~ tp @s 0 95 0
execute @s[scores={wbmtoggle=1,welcomed=1,worldcustom=0}] ~~~ effect @s slow_falling 10 1 true


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
