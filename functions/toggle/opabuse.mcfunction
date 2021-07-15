execute @s[tag=staffstatus] ~~~ scoreboard players add opamtoggledummy OPAM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a OPAM = opamtoggledummy OPAM

#turn on
execute @s[tag=staffstatus,scores={OPAM=1}] ~~~ scoreboard players set opamtoggledummy opamtoggle 1
execute @s[tag=staffstatus,scores={OPAM=1}] ~~~ scoreboard players operation @a opamtoggle = opamtoggledummy opamtoggle
execute @s[tag=staffstatus,scores={OPAM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti OP Abuse §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={OPAM=2}] ~~~ scoreboard players set opamtoggledummy opamtoggle 0
execute @s[tag=staffstatus,scores={OPAM=2}] ~~~ scoreboard players operation @a opamtoggle = opamtoggledummy opamtoggle
execute @s[tag=staffstatus,scores={OPAM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti OP Abuse §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={OPAM=2}] ~~~ scoreboard players set opamtoggledummy OPAM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 67
