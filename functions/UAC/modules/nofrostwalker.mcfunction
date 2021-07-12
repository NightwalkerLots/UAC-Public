#Anti-FrostWalker Messages
execute @s[scores={nfmtoggle=1,feeten=1},tag=Leather_Boots] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti Frostwalker §bremoved enchanted leather boots from §d"},{"selector":"@s"}]}
execute @s[scores={nfmtoggle=1,feeten=1},tag=Chain_Boots] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti Frostwalker §bremoved enchanted chain boots from §d"},{"selector":"@s"}]}
execute @s[scores={nfmtoggle=1,feeten=1},tag=Golden_Boots] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti Frostwalker §bremoved enchanted golden boots from §d"},{"selector":"@s"}]}
execute @s[scores={nfmtoggle=1,feeten=1},tag=Iron_Boots] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti Frostwalker §bremoved enchanted iron boots from §d"},{"selector":"@s"}]}
execute @s[scores={nfmtoggle=1,feeten=1},tag=Diamond_Boots] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti Frostwalker §bremoved enchanted diamond boots from §d"},{"selector":"@s"}]}
execute @s[scores={nfmtoggle=1,feeten=1},tag=Netherite_Boots] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti Frostwalker §bremoved enchanted netherite boots from §d"},{"selector":"@s"}]}

replaceitem entity @s[scores={nfmtoggle=1,feeten=1}] slot.armor.feet 1 air
execute @s[scores={nfmtoggle=1,feeten=1}] ~~~ scoreboard players set @s feeten 0


#Adds a tag for the enabled/disabled check
execute @s[scores={nfmtoggle=1}] ~~~ scoreboard players set @s NFM 1
execute @s[scores={nfmtoggle=0}] ~~~ scoreboard players set @s NFM 0
scoreboard players operation @s nfmtoggle = nfmtoggledummy nfmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
