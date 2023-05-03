#Automated LagClear 6minutes
scoreboard players add @s lagtimer 1
execute @s[scores={chatspam=1..}] ~~~ scoreboard players remove @s chatspam 1
execute @s[scores={lagtimer=40..}] ~~~ function UAC/packages/autolagclear
execute @s[scores={in_combat=1,clmtoggle=1..2}] ~~~ function UAC/packages/combatlogger
tag @s[scores={notmovingflag=0..2}] add is_moving 
tag @s[scores={notmovingflag=2..}] remove is_moving
kill @e[type=moving_block]
scoreboard players remove @s[scores={tp_cooldown=1..}] tp_cooldown 1
scoreboard players remove @s[scores={has_gt=0,entityclear=1..}] entityclear 1
execute @s[scores={entityclear=1..400,has_gt=0}] ~~~ function UAC/asset/entitycountdown

execute @s[tag=UAC_vip,tag=is_moving,scores={VIPM=2393}]  ~~~ function UAC/asset/vip_particles

execute @s[tag=!staffstatus,scores={fzplr=1,has_gt=0}] ~~~ tp @s @e[r=4,name=fzplr]


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
