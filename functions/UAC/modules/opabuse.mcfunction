#spectator
effect @r[m=c,tag=staffstatus] invisibility 2 10 true
effect @r[m=c,tag=staffstatus] night_vision 6 10 true

#This actually keeps people from doing dmg in creative. useing game bug.
effect @r[m=c,name=!NightwalkerLots] strength 2 255 true

#Disable the GodMode tool
execute @r[tag=staffstatus,scores={opamtoggle=1}] ~~~ tag @s remove tgmGodMode
execute @r[tag=staffstatus,scores={opamtoggle=1}] ~~~ scoreboard players reset @s tgmGodMode

#Hotbar Message
execute @r[scores={hmmtoggle=1}] ~~~ execute @s[tag=staffstatus,scores={OPAM=1},m=c] ~~~ titleraw @s[scores={opamtoggle=1}] actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help ` \n §bTotal Entities §7: "},{"score":{"name":"@r[scores={entitycount=0..9999}]","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@r[scores={randomspawn=10..340}]","objective":"x-axis"}},{"text":" Z = "},{"score":{"name":"@r[scores={randomspawn=10..340}]","objective":"z-axis"}}]}


#Adds a tag for the enabled/disabled check
execute @r[scores={opamtoggle=1}] ~~~ scoreboard players set @r OPAM 1
execute @r[scores={opamtoggle=0}] ~~~ scoreboard players set @r OPAM 0
scoreboard players operation @r opamtoggle = opamtoggledummy opamtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
