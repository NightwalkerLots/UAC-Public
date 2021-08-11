
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §bnetherite Kit has been applied to §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus}] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~

replaceitem entity @s[tag=staffstatus] slot.armor.head 0 netherite_helmet 1 0 {"minecraft:keep_on_death":{}}
replaceitem entity @s[tag=staffstatus] slot.armor.chest 0 netherite_chestplate 1 0 {"minecraft:keep_on_death":{}}
replaceitem entity @s[tag=staffstatus] slot.armor.legs 0 netherite_leggings 1 0 {"minecraft:keep_on_death":{}}
replaceitem entity @s[tag=staffstatus] slot.armor.feet 0 netherite_boots 1 0 {"minecraft:keep_on_death":{}}
replaceitem entity @s[tag=staffstatus] slot.weapon.offhand 0 totem_of_undying 1 0 {"minecraft:keep_on_death":{}}
replaceitem entity @s[tag=staffstatus] slot.weapon.mainhand 0 netherite_sword 1 0 {"minecraft:keep_on_death":{}}
enchant @s[tag=staffstatus] unbreaking 3
enchant @s[tag=staffstatus] mending 1
enchant @s[tag=staffstatus] sharpness 4
give @s[tag=staffstatus] bow 1 0 {"minecraft:keep_on_death":{}}
give @s[tag=staffstatus] appleenchanted 64 0 {"minecraft:keep_on_death":{}}
give @s[tag=staffstatus] arrow 64 25 {"minecraft:keep_on_death":{}}
give @s[tag=staffstatus] arrow 64 25 {"minecraft:keep_on_death":{}}
give @s[tag=staffstatus] totem_of_undying 1 0 {"minecraft:keep_on_death":{}}
give @s[tag=staffstatus] totem_of_undying 1 0 {"minecraft:keep_on_death":{}}
give @s[tag=staffstatus] totem_of_undying 1 0 {"minecraft:keep_on_death":{}}
give @s[tag=staffstatus] firework_rocket 64 3 {"minecraft:keep_on_death":{}}
give @s[tag=staffstatus] elytra 1 0 {"minecraft:keep_on_death":{}}
effect @s[tag=staffstatus] strength 150 1 true
effect @s[tag=staffstatus] resistance 150 1 true
scoreboard players set @s lstcmd 109
