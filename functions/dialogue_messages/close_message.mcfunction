tellraw @p[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §bGUI has been closed"}]}
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
