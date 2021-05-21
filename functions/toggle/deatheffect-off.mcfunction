execute @s[tag=staffstatus] ~~~ scoreboard players set BDXdummy Deathef 0
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a Deathef = BDXdummy Deathef

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Death Effect §bhas been §cDISABLED §bby §d"},{"selector":"@s"}]}
