#Remove banned items
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNA=1}] ~~~ clear @s arrow 24
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNA=1}] ~~~ clear @s arrow 25
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNM=1}] ~~~ clear @s empty_map
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNM=1}] ~~~ clear @s filled_map
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNCB=1}] ~~~ clear @s crossbow
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNSB=1}] ~~~ clear @s shulker_box
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNSB=1}] ~~~ clear @s undyed_shulker_box
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNBQ=1}] ~~~ clear @s writable_book
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNTN=1}] ~~~ clear @s tnt
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNTN=1}] ~~~ kill @e[r=50,type=tnt]
execute @s[scores={ibmtoggle=1}] ~~~ execute @s[scores={BNTD=1}] ~~~ clear @s trident


#This file is called apon every 5 seconds from UAC/packages/autolagclear if the module is enabled

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
