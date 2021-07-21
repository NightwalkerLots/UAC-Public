execute @s[scores={ltmtoggle=1}] ~~~ tag @a remove entitycounter
execute @s[scores={ltmtoggle=1}] ~~~ scoreboard players reset @a entitycount
execute @s[scores={ltmtoggle=1}] ~~~ tag @s add entitycounter
execute @s[scores={ltmtoggle=1}] ~~~ execute @e[type=item] ~~~ scoreboard players add @a[tag=entitycounter] entitycount 1
execute @s[scores={ltmtoggle=1}] ~~~ execute @e[family=monster] ~~~ scoreboard players add @a[tag=entitycounter] entitycount 1
execute @a[scores={entitycount=100..},tag=entitycounter] ~~~ execute @s[scores={ltmtoggle=1}] ~~~ function UAC/packages/autolagclearasset

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
