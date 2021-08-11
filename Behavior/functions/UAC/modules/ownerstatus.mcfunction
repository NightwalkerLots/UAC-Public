#Fake staff flag
execute @s[scores={9NW0d9Nas=!7102}] ~~~ execute @s[tag=ownerstatus] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Fake Owner Protection : §bFlagged §d"},{"selector":"@s"},{"text":"§¶§b for unauthorized owner tag."}]}

#Fake staff checks
execute @s[scores={ssmtoggle=1,ds9209D2n=!2938}] ~~~ scoreboard players set @s 2kN0nK3Kn 0
execute @s[scores={ssmtoggle=1,2kN0nK3Kn=!1928}] ~~~ scoreboard players set @s m20Kds0Nd 0
execute @s[scores={ssmtoggle=1,m20Kds0Nd=!8019}] ~~~ scoreboard players set @s 098aD2nnD 0
execute @s[scores={ssmtoggle=1,098aD2nnD=!2256}] ~~~ scoreboard players set @s 09d0i20jS 0
execute @s[scores={ssmtoggle=1,09d0i20jS=!7918}] ~~~ scoreboard players set @s 9damMM230 0
execute @s[scores={ssmtoggle=1,9damMM230=!7292}] ~~~ scoreboard players set @s 9NW0d9Nas 0
execute @s[scores={ssmtoggle=1,9NW0d9Nas=!7102}] ~~~ tag @s remove ownerstatus

#Removes Tags From Non Staff Members
tag @s[tag=!staffstatus] remove spectate
tag @s[tag=!staffstatus] remove godmode
tag @s[tag=!staffstatus] remove ownerstatus

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
