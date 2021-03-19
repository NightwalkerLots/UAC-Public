execute @r[scores={kpvpmtoggle=1}] ~~~ scoreboard players add @s[scores={kit1=1..99}] kitreplace 1
execute @r[scores={kpvpmtoggle=1}] ~~~ scoreboard players add @s[scores={vipkit=1..99}] kitreplace 1
execute @r[scores={kpvpmtoggle=1}] ~~~ execute @s[m=a,scores={kitreplace=3}] ~~~ function UAC/kitpvp/kitgive
execute @r[scores={kpvpmtoggle=1}] ~~~ execute @s[m=a,scores={kitreplace=200..9999}] ~~~ scoreboard players reset @s kitreplace

execute @r[scores={kpvpmtoggle=1}] ~~~ function UAC/kitpvp/utility


#Adds a tag for the enabled/disabled check
execute @r[scores={kpvpmtoggle=1}] ~~~ scoreboard players set @r KPVPM 1
execute @r[scores={kpvpmtoggle=0}] ~~~ scoreboard players set @r KPVPM 0
scoreboard players operation @r kpvpmtoggle = kpvpmtoggledummy kpvpmtoggle
#scoreboard players operation @r[scores={vipkit=0}] kit1 = kit1dummy kit1
execute @r[scores={kpvpmtoggle=1}] ~~~ execute @s[scores={vipkit=0}] ~~~ scoreboard players set @s kit1 1
execute @r[scores={kpvpmtoggle=1}] ~~~ execute @s[scores={vipkit=1}] ~~~ scoreboard players set @s kit1 0



#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
