#creative with score
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.3§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#creative without score
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=2,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.3§7]§b"}]}
#creative resource mode
execute @a[tag=staffstatus,m=c,scores={hmmtoggle=3,OPAM=0,opamtoggle=0,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §d` /Function UAC/help/all-commands ` §7| §7[§2v2.8.3§7]§b\n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bPlayer Count §7: "},{"score":{"name":"playerdummy","objective":"playercount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}

#Op abuse with score message
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=1,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}
#Op abuse without score message
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=2,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands `"}]}
#Op abuse resource mode
execute @s[tag=staffstatus,m=c,scores={hmmtoggle=3,OPAM=1,opamtoggle=1,hometp=3}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§¶§aCREATIVE ENABLED §7| §¶§cPVP DISABLED §7| §d` /Function UAC/help/all-commands ` \n §bEntity Count §7: "},{"score":{"name":"entitydummy","objective":"entitycount"}},{"text":" §bCurrent WorldSpawn§7: X = "},{"score":{"name":"@s","objective":"Worldx"}},{"text":" Z = "},{"score":{"name":"@s","objective":"Worldz"}}]}


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide