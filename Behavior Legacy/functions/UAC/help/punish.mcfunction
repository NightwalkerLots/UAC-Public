execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou must be staff to do this command. The tag for staff is §6staffstatus"}]}

tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§c---------- Help §7||§c Punish §7||§c §2/execute (player) ~~~ function UAC/punish §c----------"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§bThis will serve to be a big slap on the wrist for players who need displinary action."}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§bWhen executed on a player they will have a warn added to them."}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§bTheir Inventory and their Ender Chest will also be cleared. Somtimes, starting all over is worse to some people than a ban is."}]}

