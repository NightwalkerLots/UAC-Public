#Hotbar Kit1
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.hotbar 0 iron_sword 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.hotbar 1 golden_apple 32 0 {"item_lock": {"mode": "lock_in_inventory"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.hotbar 2 potion 2 32 {"item_lock": {"mode": "lock_in_inventory"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.hotbar 3 potion 2 15 {"item_lock": {"mode": "lock_in_inventory"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.hotbar 4 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.hotbar 5 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.hotbar 6 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.hotbar 7 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.hotbar 8 cooked_beef 32 2 {"item_lock": {"mode": "lock_in_inventory"}}

#Armor kit1
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.armor.head 0 iron_helmet 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.armor.chest 0 iron_chestplate 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.armor.legs 0 iron_leggings 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={kit1=1}] ~~~ replaceitem entity @s slot.armor.feet 0 iron_boots 1 0 {"item_lock": {"mode": "lock_in_slot"}}

#Hotbar Vipkit
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.hotbar 0 diamond_sword 1 0 {"item_lock": {"mode": "lock_in_inventory"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.hotbar 1 golden_apple 32 0 {"item_lock": {"mode": "lock_in_inventory"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.hotbar 2 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.hotbar 3 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.hotbar 4 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.hotbar 5 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.hotbar 6 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.hotbar 7 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.hotbar 8 cooked_beef 32 0 {"item_lock": {"mode": "lock_in_inventory"}}

#Armor vipkit
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.armor.head 0 diamond_helmet 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.armor.chest 0 diamond_chestplate 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.armor.legs 0 iron_leggings 1 0 {"item_lock": {"mode": "lock_in_slot"}}
execute @a[scores={vipkit=1}] ~~~ replaceitem entity @s slot.armor.feet 0 iron_boots 1 0 {"item_lock": {"mode": "lock_in_slot"}}

#Effects vipkit
execute @a[scores={vipkit=1}] ~~~ effect @s strength 99 1
execute @a[scores={vipkit=1}] ~~~ effect @s speed 99 1

#CLear inventory
replaceitem entity @a slot.inventory 0 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 1 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 2 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 3 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 4 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 5 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 6 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 7 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 8 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 9 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 10 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 11 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 12 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 13 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 14 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 15 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 16 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 17 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 18 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 19 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 20 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 21 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 22 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 23 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 24 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 25 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 26 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}
replaceitem entity @a slot.inventory 27 nether_star 1 0 {"item_lock": {"mode": "lock_in_slot"}}


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
