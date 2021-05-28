#Anti-FrostWalker
replaceitem entity @s[m=s,scores={nfmtoggle=1}] slot.armor.feet 1 netherite_boots 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @s[m=c,scores={nfmtoggle=1}] slot.armor.feet 1 air
execute @s[scores={nfmtoggle=1}] ~~~ execute @e[r=10,type=item,name="netherite boots"] ~~~ kill @s

#Adds a tag for the enabled/disabled check
execute @s[scores={nfmtoggle=1}] ~~~ scoreboard players set @s NFM 1
execute @s[scores={nfmtoggle=0}] ~~~ scoreboard players set @s NFM 0
scoreboard players operation @s nfmtoggle = nfmtoggledummy nfmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
