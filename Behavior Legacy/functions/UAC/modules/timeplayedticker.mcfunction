execute @s[scores={tpmtoggle=1}] ~~~ function UAC/asset/timeplayedtimer

scoreboard players add @s[scores={tpmtoggle=1}] timealive 1


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide



###This is now controlled by the animation_controllers file ('animation.controller.walk')
