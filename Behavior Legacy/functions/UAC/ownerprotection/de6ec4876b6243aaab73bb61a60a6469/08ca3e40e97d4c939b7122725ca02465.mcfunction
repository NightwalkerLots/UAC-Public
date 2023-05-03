#If they somehow have staff status, the command breaks. This fixes that.
execute @s[tag=staffstatus,scores={SSDEBUG2=0}] ~~~ tag @s remove ownerstatus
scoreboard players add @s SSDEBUG2 1

#deny messages
execute @s[scores={ssmtoggle=1,I2IO2NO=!273},tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bFake Staff Protection §2ENABLED. §bOwner must execute hidden staffstatus key first."}]}
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[scores={ssmtoggle=1,I2IO2NO=273}] ~~~ tellraw @s[tag=!staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}


#Set all checks in order
execute @s[tag=staffstatus,scores={SSDEBUG2=1,I2IO2NO=273}] ~~~ scoreboard players set @s ds9209D2n 2938
execute @s[tag=staffstatus,scores={SSDEBUG2=1,I2IO2NO=273}] ~~~ scoreboard players set @s 2kN0nK3Kn 1928
execute @s[tag=staffstatus,scores={SSDEBUG2=1,I2IO2NO=273}] ~~~ scoreboard players set @s m20Kds0Nd 8019
execute @s[tag=staffstatus,scores={SSDEBUG2=1,I2IO2NO=273}] ~~~ scoreboard players set @s 098aD2nnD 2256
execute @s[tag=staffstatus,scores={SSDEBUG2=1,I2IO2NO=273}] ~~~ scoreboard players set @s 09d0i20jS 7918
execute @s[tag=staffstatus,scores={SSDEBUG2=1,I2IO2NO=273}] ~~~ scoreboard players set @s 9damMM230 7292
execute @s[tag=staffstatus,scores={SSDEBUG2=1,I2IO2NO=273}] ~~~ scoreboard players set @s 9NW0d9Nas 7102
execute @s[tag=staffstatus,scores={SSDEBUG2=1,I2IO2NO=273}] ~~~ scoreboard players set @s staff 1
execute @s[tag=staffstatus,scores={SSDEBUG2=1,I2IO2NO=273}] ~~~ tag @s add ownerstatus

execute @s[tag=staffstatus,scores={SSDEBUG2=1}] ~~~ execute @s[tag=staffstatus,scores={staff=1}] ~~~ tellraw @a[scores={9NW0d9Nas=7102}] {"rawtext":[{"text":"§¶§cUAC ► §bOwner status §2given §bsuccessfully to §d"},{"selector":"@s"}]}

#Second Use will take owner away
execute @s[scores={SSDEBUG2=2}] ~~~ scoreboard players set @s ds9209D2n 0
execute @s[scores={SSDEBUG2=2}] ~~~ tag @s remove staffstatus
execute @s[scores={SSDEBUG2=2}] ~~~ tag @s remove ownerstatus
execute @s[tag=!staffstatus,scores={SSDEBUG2=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF ► §bOwner status §cremoved §bsuccessfully from §d"},{"selector":"@s"}]}
execute @s[scores={SSDEBUG2=2}] ~~~ scoreboard players set @s SSDEBUG2 0

#fucntion call name: (I would change this if i were you. Using a UUID works best.)
# /function UAC/ownerprotection/de6ec4876b6243aaab73bb61a60a6469/08ca3e40e97d4c939b7122725ca02465

scoreboard players set @s lstcmd 1

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
