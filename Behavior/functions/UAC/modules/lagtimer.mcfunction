#Automated LagClear 6minutes
scoreboard players add @s lagtimer 1
execute @s[scores={chatspam=1..}] ~~~ scoreboard players remove @s chatspam 1
execute @s[scores={lagtimer=40..}] ~~~ function UAC/packages/autolagclear
execute @s[scores={opamtoggle=1}] ~~~ function UAC/modules/opabuse
execute @s[scores={in_combat=1,clmtoggle=1..2}] ~~~ function UAC/packages/combatlogger
tag @s[scores={notmovingflag=0..10}] add is_moving 
tag @s[scores={notmovingflag=70..}] remove is_moving
kill @e[type=moving_block]
scoreboard players remove @s[scores={cbetime=1..}] cbetime 1
scoreboard players remove @s[scores={tp_cooldown=1..}] tp_cooldown 1
scoreboard players remove @s[scores={entityclear=1..}] entityclear 1
execute @s[scores={entityclear=1..400}] ~~~ function UAC/asset/entitycountdown

scoreboard players set @a[tag=!UAC_vip] VIPM 0
tag @a[scores={VIPM=!2393}] remove UAC_vip
execute @s[tag=UAC_vip,tag=is_moving,scores={VIPM=2393}]  ~~~ particle minecraft:eyeofender_death_explode_particle  ~ ~ ~

execute @s[tag=!staffstatus,scores={fzplr=1,has_gt=0}] ~~~ tp @s @e[r=4,name=fzplr]


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
