execute @s[tag=staffstatus] ~~~ scoreboard players add tpmtoggledummy TPM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a TPM = tpmtoggledummy TPM

#turn on
execute @s[tag=staffstatus,scores={TPM=1}] ~~~ scoreboard players set tpmtoggledummy tpmtoggle 1
execute @s[tag=staffstatus,scores={TPM=1}] ~~~ scoreboard players operation @a tpmtoggle = tpmtoggledummy tpmtoggle
execute @s[tag=staffstatus,scores={TPM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Time Played Tracker §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={TPM=2}] ~~~ scoreboard players set tpmtoggledummy tpmtoggle 0
execute @s[tag=staffstatus,scores={TPM=2}] ~~~ scoreboard players operation @a tpmtoggle = tpmtoggledummy tpmtoggle
execute @s[tag=staffstatus,scores={TPM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Time Played Tracker §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={TPM=2}] ~~~ scoreboard players set tpmtoggledummy TPM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 72
