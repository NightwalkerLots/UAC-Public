################ UNITY ANTI-CHEAT SETTINGS ################
#
# To Enable a setting, take out the { X } before the function command, and it will always be running!
# To Disable a setting, put a { X } before the function command.
#
#####################################################################################################
#
#=Unban Timer=
execute @s[tag=staffstatus,scores={unban=1}] ~~~ function UAC/modules/unbantimer
#
# =AntiCbe=
# Protection against the command block exploit
# Enabled by default
execute @s[scores={acmtoggle=1}] ~~~ function UAC/modules/anticbe
#
# =AntiFly=
# Protection against fly hacks
# Enabled by default
execute @s[scores={afmtoggle=1}] ~~~ function UAC/modules/antifly
#
#
# =No Unobtainable Items=
# Clears players of Unobtainable items
execute @s[scores={uoimtoggle=1,has_gt=0}] ~~~ function UAC/modules/unobtainableitems
#
# =AUTOMATED CLEAR LAG=
# This will automatically clear dropped items and hostile entities every 6 minutes
# Enabled by default
function UAC/modules/lagtimer
#
# =Message Display=
# This displays a custom message above all players hotbar. By default this says "32k are banned. No enchants above 10"
# Enabled by default
#function UAC/modules/hotbarmessage
#
# =Mining Detection=
execute @s[scores={mdmtoggle=1,has_gt=0}] ~~~ function UAC/modules/mining_detection
#
# =Testing Features=
# This displays the rules in chat every 10 minues
# Disable by default, people can see rules in the UAC UI from their inventory
execute @s[scores={testin=1}] ~~~ function UAC/modules/testing
#
# =Staffstatus=
# DO NOT DISABLE THIS, THIS IS ESSENTIAL FOR STAFF BYPASSES TO WORK
execute @s[scores={ssmtoggle=1}] ~~~ function UAC/modules/staffstatus
#
# =Prevent OP abuse =
# Can't do damange when in creative mode
execute @s[tag=staffstatus,scores={opamtoggle=1}] ~~~ function UAC/modules/opabuse
#
# =No Echests=
# Disables echests for nonstaff
execute @s[tag=!staffstatus,scores={nemtoggle=1}] ~ ~ ~ function UAC/modules/noechest
#
# =Anit Reach=
# Experimental, prevents players from hitting eachother from more than 5 blocks away
execute @s[scores={armtoggle=1,has_gt=0}] ~~~ function UAC/modules/antireach
#


execute @s[tag=staffstatus,scores={opamtoggle=0}] ~~~ replaceitem entity @s[scores={totemaut=329},tag=totemaut] slot.weapon.offhand 0 totem_of_undying 1 0 {"minecraft:keep_on_death":{}}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
