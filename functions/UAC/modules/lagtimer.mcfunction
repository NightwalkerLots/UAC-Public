#Automated LagClear 6minutes
scoreboard players add @r lagtimer 1
execute @r ~~~ execute @s[scores={lagtimer=50..9999999}] ~~~ function UAC/packages/autolagclear


#Automated LagClear 6minutes
#execute @a[scores={lagtimer=5500}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Entities will be cleared in §230 §bSeconds"}]}
#execute @a[scores={lagtimer=5500}] ~~~ playsound note.bass @s ~ ~ ~

#Count Down
#execute @a[scores={lagtimer=5940}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §23"}]}
#execute @a[scores={lagtimer=5940}] ~~~ playsound note.bass @s ~ ~ ~
#execute @a[scores={lagtimer=5960}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §22"}]}
#execute @a[scores={lagtimer=5960}] ~~~ playsound note.bass @s ~ ~ ~
#execute @a[scores={lagtimer=5980}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §21"}]}
#execute @a[scores={lagtimer=5980}] ~~~ playsound note.bass @s ~ ~ ~

#clear entity
#execute @a[scores={lagtimer=6000}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Entities have been §2cleared"}]}
#execute @a[scores={lagtimer=6000}] ~~~ playsound note.pling @s ~ ~ ~
#execute @a[scores={lagtimer=6000}] ~~~ function UAC/packages/autolagclear
#execute @a[scores={lagtimer=6008}] ~~~ kill @e[type=item]
#execute @r[scores={lagtimer=6010..7000}] ~~~ scoreboard players reset @s lagtimer

#Adds a tag for the enabled/disabled check
execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players set @r LTM 1
execute @r[scores={ltmtoggle=0}] ~~~ scoreboard players set @r LTM 0
scoreboard players operation @r ltmtoggle = ltmtoggledummy ltmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
