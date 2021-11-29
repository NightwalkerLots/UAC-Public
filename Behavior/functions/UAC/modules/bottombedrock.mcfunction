execute @s[scores={bbmtoggle=1,BBMCC=1}] ~~~ fill ~15 -64 ~-10 ~-10 -64 ~15 bedrock
execute @s[scores={bbmtoggle=1,BBMCC=0}] ~~~ fill ~15 0 ~-10 ~-10 0 ~15 bedrock


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
