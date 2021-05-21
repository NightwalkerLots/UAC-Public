execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @p[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou must be staff to do this command. The tag for staff is §6staffstatus"}]}

execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §b`/function UAC/lastcommand` will not be recorded in the command history"}]}
execute @s[tag=staffstatus] ~~~ function UAC/asset/last_command_check_asset
