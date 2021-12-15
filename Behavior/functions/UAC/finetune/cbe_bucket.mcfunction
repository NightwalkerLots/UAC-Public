#turn on
execute @s[tag=staffstatus,scores={CBEBU=0}] ~~~ scoreboard players set ftDummy CBEBU 1
execute @s[tag=staffstatus,scores={CBEBU=0}] ~~~ scoreboard players operation @a CBEBU = ftDummy CBEBU
execute @s[tag=staffstatus,scores={CBEBU=0}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti-CBE Bucket Remove §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={CBEBU=1}] ~~~ scoreboard players set ftDummy CBEBU 0
execute @s[tag=staffstatus,scores={CBEBU=1}] ~~~ scoreboard players operation @a CBEBU = ftDummy CBEBU
execute @s[tag=staffstatus,scores={CBEBU=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti-CBE Bucket Remove §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

#needs a dummy objective for add-switch to work. But I'm too fucked up and lazy for that right now.


scoreboard players operation @a CBEBU = ftDummy CBEBU
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
