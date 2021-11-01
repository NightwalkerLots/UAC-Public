#Prints the current player's time played score

execute @s ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bTime played: "},{"score":{"name":"@s","objective":"timeplayedday"}},{"text":"d/"},{"score":{"name":"@s","objective":"timeplayedhr"}},{"text":"h/"},{"score":{"name":"@s","objective":"timeplayedmin"}},{"text":"m/"},{"score":{"name":"@s","objective":"timeplayedsec"}},{"text":"s/"},{"score":{"name":"@s","objective":"timeplayedtick"}},{"text":"t"}]}


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide