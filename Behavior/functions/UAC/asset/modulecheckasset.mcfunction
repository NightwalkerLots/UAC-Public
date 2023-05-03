execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}

execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c========= 1 = Enabled | 0 = Disabled ========="}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c========= Protection Modules ========="}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-Fly §7[§c "},{"score":{"name":"@s","objective":"AFM"}},{"text": " §7]"},{"text":" §¶§b► §¶§bCustom Item Ban §7[§c "},{"score":{"name":"@s","objective":"IBM"}},{"text": " §7]"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-Jesus §7[§c "},{"score":{"name":"@s","objective":"ajmtoggle"}},{"text": " §7]"},{"text":" §¶§b► §¶§bNo Unobtainable Items §7[§c "},{"score":{"name":"@s","objective":"UOIM"}},{"text": " §7]"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bMining Detection §7[§c "},{"score":{"name":"@s","objective":"MDM"}},{"text": " §7]"},{"text":" §¶§b► §¶§bAnti-Chat Spam §7[§c "},{"score":{"name":"@s","objective":"acstoggle"}},{"text": " §7]"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-32k §7[§c "},{"score":{"name":"@s","objective":"illench"}},{"text": " §7]"},{"text":" §¶§b► §¶§bAnti-Lore §7[§c "},{"score":{"name":"@s","objective":"almtoggle"}},{"text": " §7]"}]}
execute @s[tag=staffstatus,scores={clmtoggle=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-C Logging §7[ §¶§2KILL MODE §7]"}]}
execute @s[tag=staffstatus,scores={clmtoggle=2}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-C Logging §7[ §¶§2CLEAR MODE §7]"}]}
execute @s[tag=staffstatus,scores={clmtoggle=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-C Logging §7[ §¶§cDISABLED §7]"}]}
execute @s[tag=staffstatus,scores={armtoggle=0,arm_gt_toggle=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-Reach §7[ §¶§cDISABLED §7]"}]}
execute @s[tag=staffstatus,scores={armtoggle=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-Reach §7[ §¶§2Function Method §7]"}]}
execute @s[tag=staffstatus,scores={arm_gt_toggle=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-Reach §7[ §¶§2Gametest Method §7]"}]}



execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c========= Utility Modules ========="}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bTimePlayed Tracker §7[§c "},{"score":{"name":"@s","objective":"TPM"}},{"text": " §7]"},{"text":" §¶§b► §¶§bChat Ranks §7[§c "},{"score":{"name":"@s","objective":"chatrank"}},{"text": " §7]"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAuto Lagclear §7[§c "},{"score":{"name":"@s","objective":"LTM"}},{"text": " §7]"},{"text":" §¶§b► §¶§bHotbar Messages §7[§c "},{"score":{"name":"@s","objective":"hmmtoggle"}},{"text": " §7]"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bPlayer Commands §7[§c "},{"score":{"name":"@s","objective":"ICM"}},{"text": " §7]"},{"text":" §¶§b► §¶§bAFK Kick §7[§c "},{"score":{"name":"@s","objective":"afkm"}},{"text": " §7]"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bDisable-Echest §7[§c "},{"score":{"name":"@s","objective":"NEM"}},{"text": " §7]"},{"text":" §¶§b► §¶§bBottom Bedrock Replace §7[§c "},{"score":{"name":"@s","objective":"BBM"}},{"text": " §7]"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bRandom Spawn §7[§c "},{"score":{"name":"@s","objective":"RSM"}},{"text": " §7]"},{"text":" §¶§b► §¶§bDeath Effects §7[§c "},{"score":{"name":"@s","objective":"Deathef"}},{"text": " §7]"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bOne Player Sleep §7[§c "},{"score":{"name":"@s","objective":"opstoggle"}},{"text": " §7]"}]}

execute @s[tag=staffstatus,scores={WBM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bWorld Border "},{"text":" §bX§7: §7[§6"},{"score":{"name":"@s","objective":"Border_Coord_X"}},{"text":"§7]"},{"text":" §bZ§7: §7[§6"},{"score":{"name":"@s","objective":"Border_Coord_Z"}},{"text":"§7]"}]}
execute @s[tag=staffstatus,scores={WBM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bWorld Border §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c========= Advanced Modules ========="}]}   

execute @s[tag=staffstatus,scores={SSM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bFake Staff Protection §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={SSM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bFake Staff Protection §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus,scores={OPAM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-Op Abuse §7[ §¶§2ENABLED §7]"}]}
execute @s[tag=staffstatus,scores={OPAM=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §¶§bAnti-Op Abuse §7[ §¶§cDISABLED §7]"}]}

execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c=== Use `/function toggle` to toggle modules==="}]}


#This hides this from the in-game function command directory
hide
