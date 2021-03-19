execute @r ~~~ titleraw @s title {"rawtext":[{"text":"§bTime Played in ticks§7: §7"},{"score":{"name":"@s","objective":"timeplayed"}},{"text":"\n§bDeaths§7: "},{"score":{"name":"@s","objective":"deaths"}},{"text":"\n§bKills§7: "},{"score":{"name":"@s","objective":"kills"}},{"text":"\n§bCurrent Killstreak§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
