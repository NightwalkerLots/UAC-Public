#Anti-FrostWalker Messages
execute @s[scores={nfmtoggle=1,feeten=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti Frostwalker §bremoved enchanted boots from §d"},{"selector":"@s"}]}


replaceitem entity @s[scores={nfmtoggle=1,feeten=1}] slot.armor.feet 1 air
execute @s[scores={nfmtoggle=1,feeten=1}] ~~~ scoreboard players set @s feeten 0


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
