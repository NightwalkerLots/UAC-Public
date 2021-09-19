#tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §¶§cFlagged §d"},{"selector":"@s"},{"text":"§¶§b for attempting CBE"}]}

scoreboard players add @s warncbe 1
playsound random.break @s ~ ~ ~
execute @s[scores={warncbe=3}] ~~~ scoreboard players add @s warn 1
execute @s[scores={warncbe=6}] ~~~ scoreboard players add @s warn 1
execute @a[scores={warncbe=9..}] ~~~ tag @s add BanCBE

#cbewarn alerts
execute @s[scores={warncbe=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti CBE §btemp kicked §d"},{"selector":"@s"},{"text":" §¶§bfor attempting CBE §7[§c1§7/§29§7]"}]}
execute @s[scores={warncbe=2}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti CBE §btemp kicked §d"},{"selector":"@s"},{"text":" §¶§bfor attempting CBE §7[§c2§7/§29§7]"}]}
execute @s[scores={warncbe=3}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti CBE §btemp kicked §d"},{"selector":"@s"},{"text":" §¶§bfor attempting CBE §7[§c3§7/§29§7]"}]}
execute @s[scores={warncbe=4}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti CBE §btemp kicked §d"},{"selector":"@s"},{"text":" §¶§bfor attempting CBE §7[§c4§7/§29§7]"}]}
execute @s[scores={warncbe=5}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti CBE §btemp kicked §d"},{"selector":"@s"},{"text":" §¶§bfor attempting CBE §7[§c5§7/§29§7]"}]}
execute @s[scores={warncbe=6}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti CBE §btemp kicked §d"},{"selector":"@s"},{"text":" §¶§bfor attempting CBE §7[§c6§7/§29§7]"}]}
execute @s[scores={warncbe=7}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti CBE §btemp kicked §d"},{"selector":"@s"},{"text":" §¶§bfor attempting CBE §7[§c7§7/§29§7]"}]}
execute @s[scores={warncbe=8}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti CBE §btemp kicked §d"},{"selector":"@s"},{"text":" §¶§bfor attempting CBE §7[§c8§7/§29§7]"}]}
execute @s[scores={warncbe=9}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §6Anti CBE §btemp kicked §d"},{"selector":"@s"},{"text":" §¶§bfor attempting CBE §7[§c9§7/§29§7]"}]}

#base warns after attempts divisable by 3
execute @s[scores={warncbe=3}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou have §7[§c1§7/§23§7] §b UAC warnings"}]}
execute @s[scores={warncbe=6}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou have been UAC Warned. Your next warning will result in a Season Ban. §7[§c2§7/§23§7]"}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
