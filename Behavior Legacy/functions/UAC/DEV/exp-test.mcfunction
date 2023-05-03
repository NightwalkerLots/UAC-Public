#If experimental features are on, set to true
event entity @a uac:test_experimental
tellraw @s[scores={has_xx=0}] {"rawtext":[{"text":"§¶§cUAC ► §6Holiday Features §7: §cNot Enabled §7|| §cSome features may not work"}]}
tellraw @s[scores={has_xx=1}] {"rawtext":[{"text":"§¶§cUAC ► §6Holiday Features §7: §2ENABLED"}]}
tellraw @s[scores={has_gt=1}] {"rawtext":[{"text":"§¶§cUAC ► §6Gametest Features §7: §2ENABLED"}]}
tellraw @s[scores={has_gt=0}] {"rawtext":[{"text":"§¶§cUAC ► §6Gametest Features §7: §cNot Enabled §7|| §cPlayer Chat commands will not work"}]}
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide