#tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §¶§cFlagged §d"},{"selector":"@s"},{"text":"§¶§b for attempting CBE"}]}


scoreboard players add @s warncbe 1
playsound random.break @s ~ ~ ~
execute @s[scores={warncbe=3}] ~~~ scoreboard players add @s warn 1
execute @s[scores={warncbe=6}] ~~~ scoreboard players add @s warn 1
execute @a[scores={warncbe=9..}] ~~~ tag @s add BanCBE
clear @s
function UAC/echestwipe
tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"'s §bCBE item warns§7: §7["},{"score":{"name":"@s","objective":"warncbe"}},{"text":"§b/9§7]"}]}
playsound note.bass @a ~ ~ ~


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
