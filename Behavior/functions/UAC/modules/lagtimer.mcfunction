#Automated LagClear 6minutes
scoreboard players add @s lagtimer 1
execute @s[scores={lagtimer=1}] ~~~ execute @r[scores={ltmtoggle=1}] ~~~ function UAC/packages/entitycount
execute @s[scores={lagtimer=40..}] ~~~ function UAC/packages/autolagclear
execute @s[scores={opamtoggle=1}] ~~~ function UAC/modules/opabuse
execute @s[scores={in_combat=1,clmtoggle=1..2}] ~~~ function UAC/packages/combatlogger
kill @e[type=moving_block]
scoreboard players remove @s[scores={cbetime=1..}] cbetime 1

scoreboard players set @a[tag=!UAC_vip] VIPM 0
tag @a[scores={VIPM=!2293}] remove UAC_vip
execute @s[tag=UAC_vip,tag=is_moving,scores={VIPM=2293}]  ~~~ particle minecraft:eyeofender_death_explode_particle  ~ ~ ~

execute @s[tag=!staffstatus,scores={fzplr=1}] ~~~ tp @s @e[r=4,name=fzplr]


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
