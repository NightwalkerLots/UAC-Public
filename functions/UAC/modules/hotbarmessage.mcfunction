#survival (with score)
execute @s[scores={hmmtoggle=1,fzplr=0,hometp=3},m=s] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.2§7] Public §b - Made by §dNightwalkerLots"},{"text":"\n §¶§bKills §7:"},{"score":{"name":"@s","objective":"kills"}},{"text":" §bDeaths §7:"},{"score":{"name":"@s","objective":"deaths"}},{"text":" §bCurrent Killstreak §7:"},{"score":{"name":"@s","objective":"killstreak"}}]}

#survival (without score)
execute @s[scores={hmmtoggle=2,fzplr=0,hometp=3},m=s] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.2§7] Public §b - Made by §dNightwalkerLots"}]}

#Frozen Player
execute @s[scores={fzplr=1}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n §¶§bLEAVING MAY RESULT IN A BAN"}]}


#creative
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=0,opamtoggle=0}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help ` | §7[§2v2.2§7]§b\n §bTotal Entities §7: "},{"score":{"name":"@s[scores={entitycount=0..9999}]","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s[scores={randomspawn=10..340}]","objective":"x-axis"}},{"text":" Z = "},{"score":{"name":"@s[scores={randomspawn=10..340}]","objective":"z-axis"}}]}

#Op abuse message
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=1,opamtoggle=1}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help ` \n §bTotal Entities §7: "},{"score":{"name":"@s[scores={entitycount=0..9999}]","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s[scores={randomspawn=10..340}]","objective":"x-axis"}},{"text":" Z = "},{"score":{"name":"@s[scores={randomspawn=10..340}]","objective":"z-axis"}}]}

#home progress bar
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=500..550}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §c❚❚❚❚❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=450..500}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §2❚§c❚❚❚❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=400..450}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §2❚❚§c❚❚❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=350..400}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §2❚❚❚§c❚❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=300..350}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §2❚❚❚❚§c❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=250..300}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §2❚❚❚❚❚§c❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=200..250}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §2❚❚❚❚❚❚§c❚❚❚
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=150..200}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §2❚❚❚❚❚❚❚§c❚❚
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=70..150}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §2❚❚❚❚❚❚❚❚§c❚
execute @s[scores={hmmtoggle=1,hometp=1,hometimer=25..70}] ~~~ title @s actionbar §¶§dWARPING HOME§7: §2❚❚❚❚❚❚❚❚❚


#Adds a tag for the enabled/disabled check
execute @s[scores={hmmtoggle=2}] ~~~ scoreboard players set @s HMM 1
execute @s[scores={hmmtoggle=1}] ~~~ scoreboard players set @s HMM 1
scoreboard players operation @s hmmtoggle = hmmtoggledummy hmmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
