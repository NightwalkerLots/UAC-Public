execute @s[scores={killstreak=10}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=20}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=30}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=40}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=50}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=60}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=70}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=80}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=90}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=100}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}
execute @s[scores={killstreak=100..999}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §bjust hit a killstreak of§7: "},{"score":{"name":"@s","objective":"killstreak"}}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
