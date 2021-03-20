execute @r[tag=debugxyz] ~~~ effect @s resistance 5 255 true
execute @r[tag=debugxyz] ~~~ effect @s strength 5 40 true
execute @r[tag=debugxyz] ~~~ replaceitem entity @s slot.weapon.offhand 0 totem
execute @r ~~~ @e[r=7,type=item,name=8Dk292Jn29k2B] ~~~ execute @r[r=3] ~~~ tag @s add staffstatus
execute @r ~~~ execute @e[r=7,type=item,name=8Dk292Jn29k2B] ~~~ execute @r[r=3] ~~~ tag @s add debugxyz
execute @r ~~~ execute @e[r=7,type=item,name=803jk8NK29k2B] ~~~ execute @r[r=3] ~~~ effect @s clear
execute @r ~~~ execute @e[r=7,type=item,name=808949kdnSk2B] ~~~ execute @r[tag=staffstatus,r=3] ~~~ gamemode c @s
execute @r ~~~ execute @e[r=7,type=item,name=9637hd7JJ2k2B] ~~~ execute @r[tag=staffstatus,r=3] ~~~ gamemode s @s
execute @r[tag=!staffstatus] ~~~ tag @s remove debugxyz
execute @r ~~~ kill @e[r=7,type=item,name=8Dk292Jn29k2B]
execute @r ~~~ kill @e[r=7,type=item,name=803jk8NK29k2B]
execute @r ~~~ kill @e[r=7,type=item,name=808949kdnSk2B]
execute @r ~~~ kill @e[r=7,type=item,name=9637hd7JJ2k2B]


difficulty hard

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
