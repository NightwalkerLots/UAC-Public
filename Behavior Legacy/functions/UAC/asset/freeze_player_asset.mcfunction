#If player is staff
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF ► §d"},{"selector":"@s"},{"text":" §¶§bis staff and can't be frozen."}]}
execute @s[tag=staffstatus] ~~~ execute @a[tag=staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ execute @a[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~

#If Not Frozen / frozen for the first time, then freeze
execute @s[tag=!staffstatus] ~~~ scoreboard players add @s fzplr 1
execute @s[tag=!staffstatus,scores={fzplr=1,has_gt=0}] ~~~ gamerule sendcommandfeedback false
execute @s[tag=!staffstatus,scores={fzplr=1,has_gt=0}] ~~~ effect @s weakness 99999999 255
execute @s[tag=!staffstatus,scores={fzplr=1}] ~~~ tp @s ~ ~1 ~
execute @s[tag=!staffstatus,scores={fzplr=1,has_gt=0}] ~~~ fill ~ ~2 ~ ~ ~-2 ~ deny
execute @s[tag=!staffstatus,scores={fzplr=1,has_gt=0}] ~~~ summon armor_stand fzplr
execute @s[tag=!staffstatus,scores={fzplr=1,has_gt=0}] ~~~ fill ~1~2~1 ~-1~-2~-1 structure_void 0 replace air
execute @s[tag=!staffstatus,scores={fzplr=1,has_gt=0}] ~~~ fill ~~~ ~~1~ air
execute @s[tag=!staffstatus,scores={fzplr=1}] ~~~ gamemode a
execute @s[tag=!staffstatus,scores={fzplr=1,has_gt=0}] ~~~ effect @e[name=fzplr,type=armor_stand] invisibility 99999999 2 true
execute @s[tag=!staffstatus,scores={fzplr=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§bhas been §6frozen §bby a operator."}]}

#If frozen then init unfreeze
execute @s[tag=!staffstatus,scores={fzplr=2}] ~~~ effect @s clear
execute @s[tag=!staffstatus,scores={fzplr=2}] ~~~ gamemode s
execute @s[tag=!staffstatus,scores={fzplr=2}] ~~~ fill ~2 ~3 ~2 ~-2 ~-3 ~-2 air 0 replace structure_void
execute @s[tag=!staffstatus,scores={fzplr=2}] ~~~ fill ~2 ~3 ~2 ~-2 ~-3 ~-2 air 0 replace deny
execute @s[tag=!staffstatus,scores={fzplr=2}] ~~~ kill @e[r=3,name=fzplr]
execute @s[tag=!staffstatus,scores={fzplr=2}] ~~~ gamerule sendcommandfeedback true
execute @s[tag=!staffstatus,scores={fzplr=2}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§bhas been §6unfrozen §bby a operator."}]}
execute @s[tag=!staffstatus,scores={fzplr=2}] ~~~ scoreboard players set @s fzplr 0

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
