execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}

execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c=========Module Status========="}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={HMM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bHotbar Message §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={HMM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bHotbar Message §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={ICM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bItem Commands §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={ICM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bItem Commands §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={LTM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAuto Lagclear §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={LTM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAuto Lagclear §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={NFM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Frostwalker §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={NFM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Frostwalker §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={TPM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bTimePlayed Tracker §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={TPM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bTimePlayed Tracker §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={AFM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Fly §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={AFM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Fly §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={APM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Phase §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={APM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-Phase §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={NEM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bDisable-Echest §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={NEM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bDisable-Echest §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={ACM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-CBE §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={ACM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bAnti-CBE §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={SEM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bNo-SpawnEggs §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={SEM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bNo-SpawnEggs §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={ELPM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bExtra LagPrevent §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={ELPM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bExtra LagPrevent §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={UOIM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bNo Unobtainable Items §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={UOIM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bNo Unobtainable Items §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={BBM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bBottom Bedrock Replace §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={BBM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bBottom Bedrock Replace §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={WBM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bWorld Border §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={WBM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bWord Border §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ execute @s[scores={RSM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bRandom Spawn §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={RSM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b►§¶§bRandom Spawn §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c===Modules can be enabled/disabled in the settings file==="}]}


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
