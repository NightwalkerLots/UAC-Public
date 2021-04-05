#WorldBorder Behavior
execute @r[rm=100000,scores={wbmtoggle=1}] ~~~ me §¶§cUAC ► §bWorldBorder exeeded.
execute @r[rm=99980,scores={wbmtoggle=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou are close to the WorldBorder §7: §2100k §7: §2(or 70700 in both x/z coords)"}]}
execute @r[rm=100000] ~~~ execute @s[scores={wbmtoggle=1}] ~~~ tp @s 245 75 -260

#tp @s[rm=100000,r=99999999] 245 75 -260


#Adds a tag for the enabled/disabled check
execute @s[scores={wbmtoggle=1}] ~~~ scoreboard players set @s WBM 1
execute @s[scores={wbmtoggle=0}] ~~~ scoreboard players set @s WBM 0
scoreboard players operation @s wbmtoggle = wbmtoggledummy wbmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
