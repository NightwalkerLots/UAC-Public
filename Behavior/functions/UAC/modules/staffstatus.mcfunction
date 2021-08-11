#Fake staff flag
execute @s[scores={ssmtoggle=1}] ~~~ execute @s[scores={I2IO2NO=!273},tag=staffstatus] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Fake Staff Protection : §bFlagged §d"},{"selector":"@s"},{"text":"§¶§b for unauthorized staff tag."}]}

#Fake staff checks
execute @s[scores={ssmtoggle=1,2DI3N=!244}] ~~~ scoreboard players set @s 39SN230 0
execute @s[scores={ssmtoggle=1,39SN230=!853}] ~~~ scoreboard players set @s GFS98 0
execute @s[scores={ssmtoggle=1,GFS98=!436}] ~~~ scoreboard players set @s D98AD 0
execute @s[scores={ssmtoggle=1,D98AD=!613}] ~~~ scoreboard players set @s I2IO2NO 0
execute @s[scores={ssmtoggle=1,I2IO2NO=!273}] ~~~ scoreboard players reset @s staff
execute @s[scores={ssmtoggle=1,I2IO2NO=!273}] ~~~ tag @s remove staffstatus

#Removes Tags From Non Staff Members
tag @s[tag=!staffstatus] remove spectate
tag @s[tag=!staffstatus] remove godmode


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
