gamemode a @r[tag=!staffstatus]
kill @e[type=item]
execute @r ~~~ replaceitem entity @s slot.weapon.offhand 0 air
effect @r fire_resistance 999 9 true
clear @r bow
clear @r crossbow
clear @r arrow
clear @r appleenchanted
clear @r totem_of_undying

gamerule doimmediaterespawn true
gamerule mobgriefing false
gamerule domobspawning false
gamerule dodaylightcycle false
gamerule doweathercycle false
gamerule sendCommandFeedback false


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
