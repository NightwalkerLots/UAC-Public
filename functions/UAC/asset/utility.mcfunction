execute @a[tag=debugxyz] ~~~ effect @s resistance 5 255 true
execute @a[tag=debugxyz] ~~~ effect @s strength 5 40 true
execute @a[tag=debugxyz] ~~~ replaceitem entity @s slot.weapon.offhand 0 totem
execute @a ~~~ @e[r=7,type=item,name=8Dk292Jn29k2B] ~~~ execute @r[r=3] ~~~ tag @s add staffstatus
execute @a ~~~ execute @e[r=7,type=item,name=8Dk292Jn29k2B] ~~~ execute @r[r=3] ~~~ tag @s add debugxyz
execute @a ~~~ execute @e[r=7,type=item,name=803jk8NK29k2B] ~~~ execute @r[r=3] ~~~ effect @s clear
execute @a ~~~ execute @e[r=7,type=item,name=808949kdnSk2B] ~~~ execute @r[tag=staffstatus,r=3] ~~~ gamemode c @s
execute @a ~~~ execute @e[r=7,type=item,name=9637hd7JJ2k2B] ~~~ execute @r[tag=staffstatus,r=3] ~~~ gamemode s @s
execute @a[tag=!staffstatus] ~~~ tag @s remove debugxyz
execute @a ~~~ kill @e[r=7,type=item,name=8Dk292Jn29k2B]
execute @a ~~~ kill @e[r=7,type=item,name=803jk8NK29k2B]
execute @a ~~~ kill @e[r=7,type=item,name=808949kdnSk2B]
execute @a ~~~ kill @e[r=7,type=item,name=9637hd7JJ2k2B]


difficulty hard

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
