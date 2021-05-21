tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§c§b§l► §d"},{"selector":"@s"},{"text":"'s §6ARMOR STATUS"},{"text":" §¶§c§b◄"}]}

execute @s[scores={headen=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b Helmet§7: §2ENCHANTED"}]}
execute @s[scores={headen=0}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b Helmet§7: §cNO ENCHANTS"}]}

execute @s[scores={chesten=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b Chestplate§7: §2ENCHANTED"}]}
execute @s[scores={chesten=0}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b ChestPlate§7: §cNO ENCHANTS"}]}

execute @s[scores={legen=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b Leggings§7: §2ENCHANTED"}]}
execute @s[scores={legen=0}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b Leggings§7: §cNO ENCHANTS"}]}

execute @s[scores={feeten=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b Boots§7: §2ENCHANTED"}]}
execute @s[scores={feeten=0}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b Boots§7: §cNO ENCHANTS"}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
