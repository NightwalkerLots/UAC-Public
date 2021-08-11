#Removes armor and warns the realm
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={headen=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §6No Enchanted Armor §bremoved enchanted helmet from §d"},{"selector":"@s"}]}
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={headen=1}] ~~~ replaceitem entity @s slot.armor.head 0 air 1 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={headen=1}] ~~~ scoreboard players set @s headen 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={chesten=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §6No Enchanted Armor §bremoved enchanted chestplate from §d"},{"selector":"@s"}]}
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={chesten=1}] ~~~ replaceitem entity @s slot.armor.chest 0 air 1 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={chesten=1}] ~~~ scoreboard players set @s chesten 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={legen=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §6No Enchanted Armor §bremoved enchanted leggings from §d"},{"selector":"@s"}]}
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={legen=1}] ~~~ replaceitem entity @s slot.armor.legs 0 air 1 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={legen=1}] ~~~ scoreboard players set @s legen 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={feeten=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §6No Enchanted Armor §bremoved enchanted Boots from §d"},{"selector":"@s"}]}
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={feeten=1}] ~~~ replaceitem entity @s slot.armor.feet 0 air 1 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={feeten=1}] ~~~ scoreboard players set @s feeten 0

#Animation Controller made by UnknownCatastrophe. Function System made by NightwalkerLots

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
