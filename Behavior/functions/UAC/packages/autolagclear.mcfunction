#this function is ran on a random player every 5 seconds ( helps for TPS control )

scoreboard players reset @s lagtimer
execute @a[tag=entityclear] ~~~ tag @a[tag=!entityclear] add nullclear
function UAC/packages/entitycount
execute @a[scores={bbmtoggle=1}] ~~~ function UAC/modules/bottombedrock
#execute @s[scores={wbmtoggle=1}] ~~~ function UAC/modules/worldborder
execute @a[scores={ibmtoggle=1}] ~~~ function UAC/modules/itemban
execute @a[scores={ssmtoggle=1}] ~~~ function UAC/modules/staffstatus
execute @s[scores={nemtoggle=1},tag=!staffstatus] ~~~ function UAC/asset/echestwipe
execute @a[scores={has_gt=0}] ~~~ function UAC/packages/bans
function UAC/modules/permban
function UAC/modules/ownerstatus
function UAC/asset/toggle_sync
function UAC/modules/randomspawn

gamerule randomtickspeed 1
execute @a[scores={chatspam=0}] ~~~ tag @s remove muted

scoreboard players set @a[tag=!UAC_vip] VIPM 0
tag @a[scores={VIPM=!2393}] remove UAC_vip
execute @a[tag=UAC_vip,tag=!is_moving,scores={VIPM=2393}]  ~~~ function particle/nether_poof_small

#fix player armor values every few seconds
execute @a[scores={headen=1}] ~~~ scoreboard players set @s headen 0
execute @a[scores={chesten=1}] ~~~ scoreboard players set @s chesten 0
execute @a[scores={legen=1}] ~~~ scoreboard players set @s legen 0
execute @a[scores={feeten=1}] ~~~ scoreboard players set @s feeten 0

#lastpos for movement detection
execute @a ~~~ scoreboard players operation @s lastpos_x = @s X_Coordinate
execute @a ~~~ scoreboard players operation @s lastpos_z = @s Z_Coordinate
execute @a ~~~ scoreboard players operation @s lastpos_y = @s Y_Coordinate
#player counter
scoreboard players reset playerdummy playercount
execute @a ~~~ scoreboard players add playerdummy playercount 1

#Extra stuff for TPS control
execute @e[r=100,type=xp_orb] ~~~ tp @s[type=xp_orb] @p
#suicide counter
scoreboard players add @s[scores={suicide=1..}] suicide 1
kill @s[scores={suicide=11}]
scoreboard players set @s[scores={suicide=11}] hometp 3
scoreboard players set @s[scores={suicide=11}] suicide 0

#This makes sure everyone doesn't get flagged for c-logging when the module is first turned on
#As the only other thing that resets their in_combat is the timer c-log timer
scoreboard players set @a[scores={clmtoggle=0}] in_combat 0

#This runs a function on players rejoining
execute @a[scores={online=0,has_gt=0}] ~~~ function UAC/packages/playerjoined
execute @s[scores={has_gt=0}] ~~~ scoreboard players set * online 0
execute @s[scores={has_gt=0}] ~~~ scoreboard players set @a online 1

#Autoban Creative
execute @a[m=c,tag=!staffstatus] ~~~ function UAC/asset/creative_flag_asset

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
