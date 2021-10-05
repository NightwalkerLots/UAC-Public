#Anti-FrostWalker Messages
execute @s[scores={nfmtoggle=1,feeten=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti Frostwalker §bremoved enchanted boots from §d"},{"selector":"@s"}]}

execute @s[scores={nfmtoggle=1,feeten=1,nethboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 netherite_boots 1 0
execute @s[scores={nfmtoggle=1,feeten=1,diaboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 diamond_boots 1 0
execute @s[scores={nfmtoggle=1,feeten=1,ironboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 iron_boots 1 0
execute @s[scores={nfmtoggle=1,feeten=1,goldboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 golden_boots 1 0
execute @s[scores={nfmtoggle=1,feeten=1,chainboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 chainmail_boots 1 0
execute @s[scores={nfmtoggle=1,feeten=1,leather_boots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 leather_boots 1 0
execute @s[scores={nfmtoggle=1}] ~~~ execute @s[scores={feeten=1}] ~~~ scoreboard players set @s feeten 0


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
