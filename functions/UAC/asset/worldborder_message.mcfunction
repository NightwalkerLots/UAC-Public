tellraw @a[scores={wbmtoggle=1,welcomed=1}] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §ctried passing the world border"}]}
tp @s[scores={wbmtoggle=1,welcomed=1}] 245 75 -260


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
