#Phantoms that spawn exessively, and item with no use
execute @s[scores={elpmtoggle=1}] ~~~ kill @e[r=40,type=phantom]

#Anti wither spam
execute @s[scores={elpmtoggle=1}] ~~~ execute @e[r=20,type=wither] ~~~ difficulty peaceful

#Teleports xp orbs to Closest Player so they arne't left behind taking up memory.
execute @s[scores={elpmtoggle=1}] ~~~ execute @e[r=90,type=xp_orb] ~~~ tp @s[type=xp_orb] @p


#Adds a tag for the enabled/disabled check
execute @s[scores={elpmtoggle=1}] ~~~ scoreboard players set @s ELPM 1
execute @s[scores={elpmtoggle=0}] ~~~ scoreboard players set @s ELPM 0
scoreboard players operation @s elpmtoggle = elpmtoggledummy elpmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
