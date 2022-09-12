scoreboard players set entitydummy entitycount 0
scoreboard players reset @a entitycount
execute @e[type=item] ~~~ scoreboard players add entitydummy entitycount 1
execute @e[family=monster] ~~~ scoreboard players add entitydummy entitycount 1
execute @r[scores={ltmtoggle=1,has_gt=0}] ~~~ scoreboard players operation @a entitycount = entitydummy entitycount
execute @a[tag=entclear,scores={ltmtoggle=1,has_gt=0}] ~~~ scoreboard players set @a entitycount 0
tag @r[scores={ltmtoggle=1,has_gt=0,entitycount=110..,entityclear=!1..}] add entclear
scoreboard players set @r[tag=entclear,scores={has_gt=0,entityclear=!1..}] entityclear 400


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
