tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §¶§d"},{"selector":"@s"}, {"text":"§¶§b Death Coords: §g"},{"score":{"name":"@s","objective":"X_Coord_D"}},{"text":"/"},{"score":{"name":"@s","objective":"Y_Coord_D"}},{"text":"/"},{"score":{"name":"@s","objective":"Z_Coord_D"}}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
