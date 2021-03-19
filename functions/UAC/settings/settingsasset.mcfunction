################ UNITY ANTI-CHEAT SETTINGS ################
#
# To Enable a setting, take out the { X } before the function command, and it will always be running!
# To Disable a setting, put a { X } before the function command.
#####################################################################################################
#
# =ITEM COMMANDS=
# This will allow people to run commands like home, setspawn and spawn by dropping a named item.
# Enabled by default
function UAC/modules/itemcommand
#
# =AntiCbe=
# Protection against the command block exploit
# Enabled by default
function UAC/modules/anticbe
#
# =AntiFly=
# Protection against fly hacks
# Enabled by default
X function UAC/modules/antifly
#
# =No spawn EGGS=
# Non-staff members are cleared of spawn eggs
# Enabled by default
function UAC/modules/clearspawneggs
#
# =No Unobtainable Items=
# Clears players of Unobtainable items
function UAC/modules/unobtainableitems
#
# =Antiphase=
# Protection against phase hacks
# Enabled by default
X function UAC/modules/antiphase
#
# =AUTOMATED CLEAR LAG=
# This will automatically clear dropped items and hostile entities every 6 minutes
# Enabled by default
function UAC/modules/lagtimer
#
# =VIP=
# This is a feature for special players in your realm. When enabled, all you have to do is /tag (player) add vip
# Enabled by default
X function UAC/modules/vip
#
# =Message Display=
# This displays a custom message above all players hotbar. By default this says "32k are banned. No enchants above 10"
# Enabled by default
function UAC/modules/hotbarmessage
#
# =World Border=
# This tp's people who pass 100k blocks back to spawn
# Enabled by default
function UAC/modules/worldborder
#
# =AUTOMATED RULES MESSGAE=
# This displays the rules in chat every 10 minues
# Disable by default, people can see rules in the UAC UI from their inventory
X function UAC/modules/rulestimer
#
# =ANTI FROSTWALKER=
# This will disable people from using frostwalker by autoreplaceing their feet slot with netherite boots
# Enabled by default
function UAC/modules/nofrostwalker
#
# =Bottom Bedrock Replace=
# Auto Replaces the bottom bedrock level
# Disabled by default
function UAC/modules/bottombedrock
#
# =UNBAN TIMER=
# This allows you to have the ability to run a command which unbans the next players to join within 2 minutes
# Enabled be default
function UAC/packages/unbantimer
#
# =TimePlayed=
# When enabled, you can see people's time played with the "stats" command. The amount of ticks can be calculated into hours played.
# Enabled by default
function UAC/modules/timeplayedticker
#
# =Staffstatus=
# DO NOT DISABLE THIS, THIS IS ESSENTIAL FOR STAFF BYPASSES TO WORK
function UAC/modules/staffstatus
#
# =KitPVP=
# Custom unity gamemode
X function UAC/modules/kitpvp
#
# =Prevent OP abuse =
# Can't do damange when in creative mode
function UAC/modules/opabuse
#
# =GodMode Command=
# Cannot be used if Anti-Op Abuse is on. This command will give a staff godmode without creative for staff purposes.
X function UAC/modules/GodModeToggle
#
# =Extra Lag Prevention=
# A more extreme measure that prevents realm lags, more for smp/anarchy and such.
function UAC/modules/extralagprevent
#
# =PermBan List=
# Autobans a list hackers known for trying to destroy realms
function UAC/modules/permban
#
# =No Echests=
# Disables echests for nonstaff
function UAC/modules/noechest
#
# =Spawn Randomizer=
# This makes the default spawn point random within a 1k radius
function UAC/modules/randomspawn
