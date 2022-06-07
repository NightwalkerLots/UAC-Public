scoreboard players reset entitydummy entitycount
scoreboard players reset @a entitycount
execute @e[type=item] ~~~ scoreboard players add entitydummy entitycount 1
execute @e[family=monster] ~~~ scoreboard players add entitydummy entitycount 1
execute @r[tag=!nullclear,scores={ltmtoggle=1}] ~~~ scoreboard players operation @s entitycount = entitydummy entitycount
execute @r[tag=!nullclear,scores={ltmtoggle=1,entitycount=130..}] ~~~ scoreboard players set @s[tag=!entityclear] entityclear 400
execute @r[tag=!nullclear,scores={entitycount=130..}] ~~~ tag @s[scores={ltmtoggle=1}] add entityclear


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
