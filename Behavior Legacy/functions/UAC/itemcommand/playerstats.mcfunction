tellraw @a[tag=stats_temp] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bTime played: "},{"score":{"name":"@s","objective":"timeplayedday"}},{"text":"d/"},{"score":{"name":"@s","objective":"timeplayedhr"}},{"text":"h/"},{"score":{"name":"@s","objective":"timeplayedmin"}},{"text":"m/"},{"score":{"name":"@s","objective":"timeplayedsec"}},{"text":"s/"},{"score":{"name":"@s","objective":"timeplayedtick"}},{"text":"t"}]}
tellraw @a[tag=stats_temp] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bDeaths§7: "},{"score":{"name":"@s","objective":"deaths"}}]}
tellraw @a[tag=stats_temp] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bKills§7: "},{"score":{"name":"@s","objective":"kills"}}]}
tellraw @a[tag=stats_temp] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bCurrent Killstreak§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
tellraw @a[tag=stats_temp] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bMoney§7: "},{"score":{"name":"@s","objective":"money"}}]}
tellraw @a[tag=stats_temp] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bDiamonds§7: §c"},{"score":{"name":"@s","objective":"diamond_ore"}},{"text":" §bEmeralds§7: §c"},{"score":{"name":"@s","objective":"emerald_ore"}},{"text":" §bGold§7: §c"},{"score":{"name":"@s","objective":"gold_ore"}},{"text":" §bIron§7: §c"},{"score":{"name":"@s","objective":"iron_ore"}},{"text":"§b Lapis§7: §c"},{"score":{"name":"@s","objective":"lapis_ore"}},{"text":"§b Netherite§7: §c"},{"score":{"name":"@s","objective":"ancient_debris"}}]}

tag @a remove stats_temp

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
