execute @s[tag=ownerstatus] ~~~ scoreboard players add opamtoggledummy OPAM 1
execute @s[tag=ownerstatus] ~~~ scoreboard players operation @a OPAM = opamtoggledummy OPAM

#turn on
execute @s[tag=ownerstatus,scores={OPAM=1}] ~~~ scoreboard players set opamtoggledummy opamtoggle 1
execute @s[tag=ownerstatus,scores={OPAM=1}] ~~~ scoreboard players operation @a opamtoggle = opamtoggledummy opamtoggle
execute @s[tag=ownerstatus,scores={OPAM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Anti OP Abuse §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=ownerstatus,scores={OPAM=2}] ~~~ scoreboard players set opamtoggledummy opamtoggle 0
execute @s[tag=ownerstatus,scores={OPAM=2}] ~~~ scoreboard players operation @a opamtoggle = opamtoggledummy opamtoggle
execute @s[tag=ownerstatus,scores={OPAM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Anti OP Abuse §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=ownerstatus,scores={OPAM=2}] ~~~ scoreboard players set opamtoggledummy OPAM 0
#Deny Nonstaff
execute @s[tag=!ownerstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly Ownerstatus can use this command"}]}
execute @s[tag=!ownerstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=ownerstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 67
