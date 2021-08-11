#Called apon every few seconds from `packages/autolagclear`

#Sometimes the armor enchant status will not update properly when taking armor off.
#This fixes it by updating players without armor to the `no enchants` status every few seconds.
execute @s[scores={headen=1}] ~~~ scoreboard players set @s headen 0
execute @s[scores={chesten=1}] ~~~ scoreboard players set @s chesten 0
execute @s[scores={legen=1}] ~~~ scoreboard players set @s legen 0
execute @s[scores={feeten=1}] ~~~ scoreboard players set @s feeten 0




#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
