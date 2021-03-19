tellraw @a {"rawtext":[{"text":"§¶§c--------Unity Anarchy Rules--------"}]}
tellraw @a {"rawtext":[{"text":"§¶§b► No enchants beyond 10 - 32ks are banned"}]}
tellraw @a {"rawtext":[{"text":"§¶§b► No going past 100k (or 70700 in both x/z coords) blocks in any dimension"}]}
tellraw @a {"rawtext":[{"text":"§¶§b► No actions that crash or lag the realm"}]}
tellraw @a {"rawtext":[{"text":"§¶§b► No using the CBE exploit"}]}
tellraw @a {"rawtext":[{"text":"§¶§b► No entity spawning"}]}
tellraw @a {"rawtext":[{"text":"§¶§b► Do not spawn in Unobtainable Items"}]}
tellraw @s {"rawtext":[{"text":"§¶§b► Banned Vanilla Items §7: §cMaps, Dispenser, Mob Spawner, Crossbow, Bedrock, Barrier, Ender Chest, Spawn Eggs, Fish Buckets, Beehives, Beenests"}]}
tellraw @a {"rawtext":[{"text":"§¶§b► Staff may not do pvp while in creative mode"}]}
tellraw @a {"rawtext":[{"text":"§¶§b► Staff can not teleport players to other players"}]}
tellraw @a {"rawtext":[{"text":"§¶§b► Name a item one of the following and Drop It:"}]}
tellraw @a {"rawtext":[{"text":"§¶§b  home - spawn - setspawn"}]}
tellraw @a {"rawtext":[{"text":"§¶§c---------------------------------"}]}
execute @a ~~~ playsound note.snare @s ~ ~ ~
function UAC/asset/discord
function UAC/asset/version
function UAC/asset/createdby
tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":"§¶§b Provided the rules"}]}

#No longer needs to be automated cause of the UI
execute @a[scores={rulestimer=10010}] ~~~ scoreboard players reset @a rulestimer

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
