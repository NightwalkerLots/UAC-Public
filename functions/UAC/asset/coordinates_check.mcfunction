tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§c§b§l► §d"},{"selector":"@s"},{"text":"'s §gCOORDINATES"},{"text":" §¶§c§b◄"}]}

tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b Coordinates§f: §g"},{"score":{"name":"@s","objective":"X_Coordinate"}},{"text":"/"},{"score":{"name":"@s","objective":"Y_Coordinate"}},{"text":"/"},{"score":{"name":"@s","objective":"Z_Coordinate"}}]}
tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§d"},{"selector":"@s"}, {"text":"§¶§b Spawn Coords: §g"},{"score":{"name":"@s","objective":"X_Coord_S"}},{"text":"/"},{"score":{"name":"@s","objective":"Y_Coord_S"}},{"text":"/"},{"score":{"name":"@s","objective":"Z_Coord_S"}}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
