
execute @s[tag=staffstatus,scores={has_gt=0}] ~~~ scoreboard players operation @a armtoggle = armtoggledummy armtoggle
execute @s[tag=staffstatus,scores={has_gt=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §cLOCKED for performance §bplease use the Gametest method §7: §6UAC.antireach on"}]}


#turn on
execute @s[tag=staffstatus,scores={armtoggle=1,arm_gt_toggle=0,has_gt=0}] ~~~ scoreboard players operation @a armtoggle = armtoggledummy armtoggle
execute @s[tag=staffstatus,scores={armtoggle=1,arm_gt_toggle=0,has_gt=0}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Anti-Reach §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}

#turn off
execute @s[tag=staffstatus,scores={armtoggle=2,has_gt=0}] ~~~ scoreboard players operation @a armtoggle = armtoggledummy armtoggle
execute @s[tag=staffstatus,scores={armtoggle=2,has_gt=0}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Anti-Reach §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={armtoggle=2,has_gt=0}] ~~~ fill ~10 ~10 ~10 ~-10 ~-10 ~-10 air 0 replace structure_void
execute @s[tag=staffstatus,scores={armtoggle=2,has_gt=0}] ~~~ scoreboard players set armtoggledummy armtoggle 0
execute @s[tag=staffstatus,scores={armtoggle=2,has_gt=0}] ~~~ scoreboard players operation @a armtoggle = armtoggledummy armtoggle

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

