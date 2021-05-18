#Fake staff flag
execute @s[scores={ssmtoggle=1}] ~~~ execute @s[scores={I2IO2NO=0},tag=staffstatus] ~~~ tellraw @a[scores={2DI3N=0}] {"rawtext":[{"text":"§¶§cUAC ► §6Fake Staff Protection : §bFlagged §d"},{"selector":"@s"},{"text":"§¶§b for unauthorized staff tag."}]}

#Fake staff checks
execute @s[scores={ssmtoggle=1}] ~~~ scoreboard players set @s[scores={2DI3N=!244}] 39SN230 0
execute @s[scores={ssmtoggle=1}] ~~~ scoreboard players set @s[scores={39SN230=!853}] GFS98 0
execute @s[scores={ssmtoggle=1}] ~~~ scoreboard players set @s[scores={GFS98=!436}] D98AD 0
execute @s[scores={ssmtoggle=1}] ~~~ scoreboard players set @s[scores={D98AD=!613}] I2IO2NO 0
execute @s[scores={ssmtoggle=1}] ~~~ scoreboard players reset @s[scores={I2IO2NO=!273}] staff
execute @s[scores={ssmtoggle=1}] ~~~ tag @s[scores={I2IO2NO=!273}] remove staffstatus


#Adds a tag for the enabled/disabled check
execute @s[scores={ssmtoggle=1}] ~~~ scoreboard players set @s SSM 1
execute @s[scores={ssmtoggle=0}] ~~~ scoreboard players set @s SSM 0
scoreboard players operation @s ssmtoggle = ssmtoggledummy ssmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
