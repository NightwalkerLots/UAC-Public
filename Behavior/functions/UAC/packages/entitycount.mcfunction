execute @s[scores={ltmtoggle=1}] ~~~ scoreboard players reset entitydummy entitycount
execute @s[scores={ltmtoggle=1}] ~~~ scoreboard players reset @a entitycount
execute @s[scores={ltmtoggle=1}] ~~~ execute @e[type=item] ~~~ scoreboard players add entitydummy entitycount 1
execute @s[scores={ltmtoggle=1}] ~~~ execute @e[family=monster] ~~~ scoreboard players add entitydummy entitycount 1
execute @s[scores={ltmtoggle=1}] ~~~ scoreboard players operation @s entitycount = entitydummy entitycount
execute @a[scores={entitycount=100..}] ~~~ execute @s[scores={ltmtoggle=1}] ~~~ function UAC/packages/autolagclearasset
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
