#Removes armor and warns the realm
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={headen=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §6No Enchanted Armor §bremoved helmet enchants from §d"},{"selector":"@s"}]}
execute @s[scores={damtoggle=1,headen=1,nethhelm=1}] ~~~ replaceitem entity @s slot.armor.head 0 netherite_helmet 1 0
execute @s[scores={damtoggle=1,headen=1,diahelm=1}] ~~~ replaceitem entity @s slot.armor.head 0 diamond_helmet 1 0
execute @s[scores={damtoggle=1,headen=1,ironhelm=1}] ~~~ replaceitem entity @s slot.armor.head 0 iron_helmet 1 0
execute @s[scores={damtoggle=1,headen=1,goldhelm=1}] ~~~ replaceitem entity @s slot.armor.head 0 golden_helmet 1 0
execute @s[scores={damtoggle=1,headen=1,chainhelm=1}] ~~~ replaceitem entity @s slot.armor.head 0 chainmail_helmet 1 0
execute @s[scores={damtoggle=1,headen=1,leathhelm=1}] ~~~ replaceitem entity @s slot.armor.head 0 leather_helmet 1 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={headen=1}] ~~~ scoreboard players set @s headen 0
execute @s[scores={damtoggle=1,chesten=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §6No Enchanted Armor §bremoved chestplate enchants from §d"},{"selector":"@s"}]}
execute @s[scores={damtoggle=1,chesten=1,nethchest=1}] ~~~ replaceitem entity @s slot.armor.chest 0 netherite_chestplate 1 0
execute @s[scores={damtoggle=1,chesten=1,diachest=1}] ~~~ replaceitem entity @s slot.armor.chest 0 diamond_chestplate 1 0
execute @s[scores={damtoggle=1,chesten=1,ironchest=1}] ~~~ replaceitem entity @s slot.armor.chest 0 iron_chestplate 1 0
execute @s[scores={damtoggle=1,chesten=1,goldchest=1}] ~~~ replaceitem entity @s slot.armor.chest 0 golden_chestplate 1 0
execute @s[scores={damtoggle=1,chesten=1,chainchest=1}] ~~~ replaceitem entity @s slot.armor.chest 0 chainmail_chestplate 1 0
execute @s[scores={damtoggle=1,chesten=1,leathchest=1}] ~~~ replaceitem entity @s slot.armor.chest 0 leather_chestplate 1 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={chesten=1}] ~~~ scoreboard players set @s chesten 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={legen=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §6No Enchanted Armor §bremoved legging enchants from §d"},{"selector":"@s"}]}
execute @s[scores={damtoggle=1,legen=1,nethlegs=1}] ~~~ replaceitem entity @s slot.armor.legs 0 netherite_leggings 1 0
execute @s[scores={damtoggle=1,legen=1,dialegs=1}] ~~~ replaceitem entity @s slot.armor.legs 0 diamond_leggings 1 0
execute @s[scores={damtoggle=1,legen=1,ironlegs=1}] ~~~ replaceitem entity @s slot.armor.legs 0 iron_leggings 1 0
execute @s[scores={damtoggle=1,legen=1,goldlegs=1}] ~~~ replaceitem entity @s slot.armor.legs 0 golden_leggings 1 0
execute @s[scores={damtoggle=1,legen=1,chainlegs=1}] ~~~ replaceitem entity @s slot.armor.legs 0 chainmail_leggings 1 0
execute @s[scores={damtoggle=1,legen=1,leathlegs=1}] ~~~ replaceitem entity @s slot.armor.legs 0 leather_leggings 1 0
execute @s[scores={damtoggle=1,legen=1}] ~~~ scoreboard players set @s legen 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={feeten=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §6No Enchanted Armor §bremoved boot enchants from §d"},{"selector":"@s"}]}
execute @s[scores={damtoggle=1,feeten=1,nethboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 netherite_boots 1 0
execute @s[scores={damtoggle=1,feeten=1,diaboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 diamond_boots 1 0
execute @s[scores={damtoggle=1,feeten=1,ironboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 iron_boots 1 0
execute @s[scores={damtoggle=1,feeten=1,goldboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 golden_boots 1 0
execute @s[scores={damtoggle=1,feeten=1,chainboots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 chainmail_boots 1 0
execute @s[scores={damtoggle=1,feeten=1,leather_boots=1}] ~~~ replaceitem entity @s slot.armor.feet 0 leather_boots 1 0
execute @s[scores={damtoggle=1}] ~~~ execute @s[scores={feeten=1}] ~~~ scoreboard players set @s feeten 0

#Animation Controller made by UnknownCatastrophe. Function System made by NightwalkerLots

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
