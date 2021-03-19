#Phantoms that spawn exessively, and item with no use
execute @r[scores={elpmtoggle=1}] ~~~ kill @e[r=20,type=item,name="rotten flesh"]
execute @r[scores={elpmtoggle=1}] ~~~ kill @e[r=20,type=phantom]

#Anti wither spam
execute @r[scores={elpmtoggle=1}] ~~~ execute @e[r=20,type=wither] ~~~ difficulty peaceful

#Teleports xp orbs to Closest Player so they arne't left behind taking up memory.
execute @r[scores={elpmtoggle=1}] ~~~ execute @e[r=50,type=xp_orb] ~~~ tp @s[type=xp_orb] @p


#Adds a tag for the enabled/disabled check
execute @r[scores={elpmtoggle=1}] ~~~ scoreboard players set @r ELPM 1
execute @r[scores={elpmtoggle=0}] ~~~ scoreboard players set @r ELPM 0
scoreboard players operation @r elpmtoggle = elpmtoggledummy elpmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
