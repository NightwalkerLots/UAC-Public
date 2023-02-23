execute @s[tag=ownerstatus] ~~~ scoreboard players add ssmtoggledummy SSM 1
execute @s[tag=ownerstatus] ~~~ scoreboard players operation @a SSM = ssmtoggledummy SSM

#turn on
execute @s[tag=ownerstatus,scores={SSM=1}] ~~~ scoreboard players set ssmtoggledummy ssmtoggle 1
execute @s[tag=ownerstatus,scores={SSM=1}] ~~~ scoreboard players operation @a ssmtoggle = ssmtoggledummy ssmtoggle
execute @s[tag=ownerstatus,scores={SSM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Fake Staff Protection §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=ownerstatus,scores={SSM=2}] ~~~ scoreboard players set ssmtoggledummy ssmtoggle 0
execute @s[tag=ownerstatus,scores={SSM=2}] ~~~ scoreboard players operation @a ssmtoggle = ssmtoggledummy ssmtoggle
execute @s[tag=ownerstatus,scores={SSM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Fake Staff Protection §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=ownerstatus,scores={SSM=2}] ~~~ scoreboard players set ssmtoggledummy SSM 0
#Deny Nonstaff
execute @s[tag=!ownerstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► This is ment for owners who have more knowledge with add-ons.\nPreform the Staff Key, then the Ownerstatus Key to unlock this command.\nWhen this is enabled, you must execute the Staff key onto your staff so they may have the staffstatus tag.\nFor More info please join our Discord"}]}
execute @s[tag=!ownerstatus] ~~~ function UAC/asset/discord
execute @s[tag=!ownerstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=ownerstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 27
