#survival (with score)
execute @s[scores={hmmtoggle=1,fzplr=0,hometp=3},m=s] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.3§7] Public §b - Made by §dNightwalkerLots"},{"text":"\n §¶§bKills §7:"},{"score":{"name":"@s","objective":"kills"}},{"text":" §bDeaths §7:"},{"score":{"name":"@s","objective":"deaths"}},{"text":" §bCurrent Killstreak §7:"},{"score":{"name":"@s","objective":"killstreak"}}]}

#survival (without score)
execute @s[scores={hmmtoggle=2,fzplr=0,hometp=3},m=s] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.3§7] Public §b - Made by §dNightwalkerLots"}]}

#personal - stats 
execute @s[scores={hmmtoggle=0,fzplr=0,hometp=1337},m=s] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.3§7] Public §b - Made by §dNightwalkerLots"},{"text":"\n §¶§bKills §7:"},{"score":{"name":"@s","objective":"kills"}},{"text":" §bDeaths §7:"},{"score":{"name":"@s","objective":"deaths"}},{"text":" §bCurrent Killstreak §7:"},{"score":{"name":"@s","objective":"killstreak"}}]}

#personal - entitycount 
execute @a[scores={hmmtoggle=0,fzplr=0,hometp=420}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bUnity AntiCheat §7[§2v2.3§7] Public §b - Made by §dNightwalkerLots\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}}]}

#Frozen Player
execute @s[scores={fzplr=1}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§bYOU HAVE BEEN §cFROZEN §bBY AN OPERATOR \n §¶§bLEAVING MAY RESULT IN A BAN"}]}

#creative with score
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help ` §7| §7[§2v2.3§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@a[tag=randomspawn,scores={randomspawn=10..340}]","objective":"x-axis"}},{"text":" Z = "},{"score":{"name":"@a[scores={randomspawn=10..340}]","objective":"z-axis"}}]}
#creative without score
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help ` §7| §7[§2v2.3§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@a[tag=randomspawn,scores={randomspawn=10..340}]","objective":"x-axis"}},{"text":" Z = "},{"score":{"name":"@a[scores={randomspawn=10..340}]","objective":"z-axis"}}]}

#Op abuse with score message
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@a[tag=randomspawn,scores={randomspawn=10..340}]","objective":"x-axis"}},{"text":" Z = "},{"score":{"name":"@r[scores={randomspawn=10..340}]","objective":"z-axis"}}]}
#Op abuse without score message
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=2,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@a[tag=randomspawn,scores={randomspawn=10..340}]","objective":"x-axis"}},{"text":" Z = "},{"score":{"name":"@r[scores={randomspawn=10..340}]","objective":"z-axis"}}]}

#unban timer progress bar
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=500..540}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §c❚❚❚❚❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=440..500}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §2❚§c❚❚❚❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=400..440}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §2❚❚§c❚❚❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=340..400}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §2❚❚❚§c❚❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=300..340}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §2❚❚❚❚§c❚❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=240..300}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §2❚❚❚❚❚§c❚❚❚❚
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=200..240}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §2❚❚❚❚❚❚§c❚❚❚
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=140..200}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §2❚❚❚❚❚❚❚§c❚❚
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=70..140}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §2❚❚❚❚❚❚❚❚§c❚
execute @s[scores={hmmtoggle=1,hometp=5,unbantimer=45..70}] ~~~ title @s actionbar §¶§dUNBAN WINDOW CLOSING§7: §2❚❚❚❚❚❚❚❚❚


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
