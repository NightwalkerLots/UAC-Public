scoreboard players add @s SSDEBUG 1

execute @s[tag=!staffstatus,scores={SSDEBUG=1}] ~~~ scoreboard players set @s 2DI3N 244
execute @s[tag=!staffstatus,scores={SSDEBUG=1}] ~~~ scoreboard players set @s 39SN230 853
execute @s[tag=!staffstatus,scores={SSDEBUG=1}] ~~~ scoreboard players set @s GFS98 436
execute @s[tag=!staffstatus,scores={SSDEBUG=1}] ~~~ scoreboard players set @s D98AD 613
execute @s[tag=!staffstatus,scores={SSDEBUG=1}] ~~~ scoreboard players set @s I2IO2NO 273
execute @s[tag=!staffstatus,scores={SSDEBUG=1}] ~~~ scoreboard players set @s staff 1
execute @s[tag=!staffstatus,scores={SSDEBUG=1}] ~~~ tag @s add staffstatus

execute @s[tag=staffstatus,scores={SSDEBUG=1}] ~~~ execute @s[tag=staffstatus,scores={staff=1}] ~~~ tellraw @s[scores={I2IO2NO=273}] {"rawtext":[{"text":"§¶§cUAC ► §bStaff status §2given §bsuccessfully"}]}


execute @s[scores={SSDEBUG=2}] ~~~ scoreboard players set @s 2DI3N 0
execute @s[scores={SSDEBUG=2}] ~~~ tag @s remove staffstatus
execute @s[tag=!staffstatus,scores={SSDEBUG=2}] ~~~ tellraw @s[scores={2DI3N=0}] {"rawtext":[{"text":"§¶§cUAC ► §bStaff status §cremoved §bsuccessfully"}]}
execute @s[scores={SSDEBUG=2}] ~~~ scoreboard players set @s SSDEBUG 0

#fucntion call name:
# /function UAC/5d57e690a2764649a456c91b080f643c/49e206613b7f413bb0d4c786a82f1b12

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
