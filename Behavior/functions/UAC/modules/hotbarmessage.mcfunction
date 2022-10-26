#survival (with score)
execute @s[scores={hmmtoggle=1,fzplr=0,hometp=3,suicide=0},m=s] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.7§7] Public §b - Made by §dNightwalkerLots"},{"text":"\n §¶§bKills §7:"},{"score":{"name":"@s","objective":"kills"}},{"text":" §bDeaths §7:"},{"score":{"name":"@s","objective":"deaths"}},{"text":" §bCurrent Killstreak §7:"},{"score":{"name":"@s","objective":"killstreak"}},{"text":" §bMoney §7:"},{"score":{"name":"@s","objective":"money"}}]}

#survival (without score)
execute @s[scores={hmmtoggle=2,fzplr=0,hometp=3,suicide=0},m=s] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.7§7] Public §b - Made by §dNightwalkerLots"}]}

#survival (resource-pack mode)
execute @s[scores={hmmtoggle=3,fzplr=0,hometp=3,suicide=0}] ~~~ titleraw @s title {"rawtext":[{"text":"§¶§bCurrent Version §7[§2v2.7§7] \n\n§6Self Stats"},{"text":"\n§¶§bKills §7: "},{"score":{"name":"@s","objective":"kills"}},{"text":"\n§bDeaths §7: "},{"score":{"name":"@s","objective":"deaths"}},{"text":"\n§bCurrent Killstreak §7: "},{"score":{"name":"@s","objective":"killstreak"}},{"text":"\n§bMoney §7: "},{"score":{"name":"@s","objective":"money"}},{"text":"\n§¶§bDeath Coords: §g "},{"score":{"name":"@s","objective":"X_Coord_D"}},{"text":"/"},{"score":{"name":"@s","objective":"Y_Coord_D"}},{"text":"/"},{"score":{"name":"@s","objective":"Z_Coord_D"}},{"text":"\n§bTime played: "},{"score":{"name":"@s","objective":"timeplayedday"}},{"text":"d/"},{"score":{"name":"@s","objective":"timeplayedhr"}},{"text":"h/"},{"score":{"name":"@s","objective":"timeplayedmin"}},{"text":"m/"},{"score":{"name":"@s","objective":"timeplayedsec"}},{"text":"s/"},{"score":{"name":"@s","objective":"timeplayedtick"}},{"text":"t"},{"text":"\n\n§6Server Stats\n§bPlayerCount §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":"\n§bEntityCount §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}}]}


#personal - stats 
execute @s[scores={hmmtoggle=0,fzplr=0,hometp=1337,suicide=0}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.7§7] Public §b - Made by §dNightwalkerLots"},{"text":"\n §¶§bKills §7:"},{"score":{"name":"@s","objective":"kills"}},{"text":" §bDeaths §7:"},{"score":{"name":"@s","objective":"deaths"}},{"text":" §bCurrent Killstreak §7:"},{"score":{"name":"@s","objective":"killstreak"}}]}

#personal - entitycount 
execute @a[scores={hmmtoggle=0,fzplr=0,hometp=420,suicide=0}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.7§7] Public §b - Made by §dNightwalkerLots\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}}]}

#Frozen Player
execute @s[scores={fzplr=1}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n §¶§bLEAVING MAY RESULT IN A BAN"}]}

# tellraw @a {"rawtext":[{"text":"\n§¶§cUAC §¶§b► Type §6UAC.help §bfor info on all commnads.\n"}]}

#Creative messages
execute @s[tag=staffstatus,m=c] ~~~ function UAC/asset/hotbar_creative

#unban timer progress bar
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=1..}] ~~~ function UAC/asset/hotbar_unbantimer

#suicide progress bar
execute @s[scores={suicide=1..}] ~~~ function UAC/asset/hotbar_suicidetimer


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
