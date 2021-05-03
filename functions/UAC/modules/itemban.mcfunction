#precache all toggled items
scoreboard players operation @s BNA = BNAdummy BNA

#Remove banned items
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNA=1}] ~~~ clear @s arrow 24 64
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNA=1}] ~~~ clear @s arrow 25 64
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNM=1}] ~~~ clear @s empty_map
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNM=1}] ~~~ clear @s filled_map
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNCB=1}] ~~~ clear @s crossbow

#Precache for module check toggle status
execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players set @s IBM 1
execute @s[scores={ibmtoggle=0}] ~~~ scoreboard players set @s IBM 0

#This file is called apon every 5 seconds from UAC/packages/autolagclear if the module is enabled

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
