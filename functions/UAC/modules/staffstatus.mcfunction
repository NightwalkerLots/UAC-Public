execute @r[scores={ssmtoggle=1}] ~~~ scoreboard players set @s[scores={2DI3N=!244}] 39SN230 0
execute @r[scores={ssmtoggle=1}] ~~~ scoreboard players set @s[scores={39SN230=!853}] GFS98 0
execute @r[scores={ssmtoggle=1}] ~~~ scoreboard players set @s[scores={GFS98=!436}] D98AD 0
execute @r[scores={ssmtoggle=1}] ~~~ scoreboard players set @s[scores={D98AD=!613}] I2IO2NO 0
execute @r[scores={ssmtoggle=1}] ~~~ scoreboard players reset @s[scores={I2IO2NO=!273}] staff
execute @r[scores={ssmtoggle=1}] ~~~ tag @s[scores={I2IO2NO=!273}] remove staffstatus


#Adds a tag for the enabled/disabled check
execute @r[scores={ssmtoggle=1}] ~~~ scoreboard players set @r SSM 1
execute @r[scores={ssmtoggle=0}] ~~~ scoreboard players set @r SSM 0
scoreboard players operation @r ssmtoggle = ssmtoggledummy ssmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
