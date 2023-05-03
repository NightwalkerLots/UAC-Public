execute @s[scores={armtoggle=1}] ~~~ fill ~8 ~7 ~8 ~-8 ~-7 ~-8 air 0 replace structure_void
execute @s[scores={armtoggle=1,Y_Coordinate=-35..}] ~~~ fill ^-1^1^5 ^1^2^5 structure_void 0 replace air


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide