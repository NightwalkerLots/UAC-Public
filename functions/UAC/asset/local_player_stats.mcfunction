playsound note.pling @a[r=7] ~ ~ ~
function UAC/asset/localtimeplayed
tellraw @a[r=7] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bwarns§7: §7["},{"score":{"name":"@s","objective":"warn"}},{"text":"§b/3§7]"}]}
tellraw @a[r=7] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §billegal item warns§7: §7["},{"score":{"name":"@s","objective":"warnillegal"}},{"text":"§b/9§7]"}]}
tellraw @a[r=7] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bDeaths§7: "},{"score":{"name":"@s","objective":"deaths"}}]}
tellraw @a[r=7] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bKills§7: "},{"score":{"name":"@s","objective":"kills"}}]}
tellraw @a[r=7] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bCurrent Killstreak§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}

scoreboard players set @s lstcmd 6

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
