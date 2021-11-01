execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}

execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c========= Module Status ========="}]}

execute @s[tag=staffstatus,scores={HMM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bHotbar Message §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={HMM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bHotbar Message §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={ICM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bPlayer Commands §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={ICM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bPlayer Commands §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={LTM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAuto Lagclear §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={LTM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAuto Lagclear §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={NFM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Frostwalker §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={NFM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Frostwalker §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={TPM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bTimePlayed Tracker §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={TPM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bTimePlayed Tracker §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={AFM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Fly §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={AFM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Fly §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={NEM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bDisable-Echest §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={NEM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bDisable-Echest §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={ACM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-CBE §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={ACM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-CBE §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={UOIM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bNo Unobtainable Items §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={UOIM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bNo Unobtainable Items §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={BBM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bBottom Bedrock Replace §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={BBM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bBottom Bedrock Replace §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={WBM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bWorld Border §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={WBM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bWord Border §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={RSM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bRandom Spawn §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={RSM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bRandom Spawn §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={IBM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bCustom Item Ban §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={IBM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bCustom Item Ban §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={SSM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bFake Staff Protection §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={SSM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bFake Staff Protection §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={OPAM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Op Abuse §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={OPAM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Op Abuse §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={DAM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bNo Enchanted Armor §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={DAM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bNo Enchanted Armor §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={Deathef=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bDeath Effects §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={Deathef=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bDeath Effects §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={MDM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bMining Detection §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={MDM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bMining Detection §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={OSM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bOneShot Detection §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={OSM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bOneShot Detection §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c=== Use ``/function toggle` to toggle modules==="}]}


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
