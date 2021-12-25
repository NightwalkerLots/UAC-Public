#creative with score
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help ` §7| §7[§2v2.4§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#creative without score
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=2,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help ` §7| §7[§2v2.4§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}

#Op abuse with score message
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#Op abuse without score message
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=2,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}



execute @a ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§c32ks Allowed §f| §aNo Nested or Thorns §f| §cdiscord.gg/fallenanarchy"},{"text":"\n §¶§bKills §7:"},{"score":{"name":"@s","objective":"kills"}},{"text":" §bDeaths §7:"},{"score":{"name":"@s","objective":"deaths"}},{"text":" §bCurrent Killstreak §7:"},{"score":{"name":"@s","objective":"killstreak"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}}]}
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide