#Anti-FrostWalker
replaceitem entity @r[m=s,scores={nfmtoggle=1}] slot.armor.feet 1 netherite_boots 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @r[scores={nfmtoggle=1}] ~~~ execute @e[r=10,type=item,name="netherite boots"] ~~~ kill @s

#Adds a tag for the enabled/disabled check
execute @r[scores={nfmtoggle=1}] ~~~ scoreboard players set @r NFM 1
execute @r[scores={nfmtoggle=0}] ~~~ scoreboard players set @r NFM 0
scoreboard players operation @r nfmtoggle = nfmtoggledummy nfmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide

/title @a[m=c] actionbar §l§bCreative Mode : §2ENABLED §7|§b PVP : §cDISABLED
