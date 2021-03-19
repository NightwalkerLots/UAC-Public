#bridge-file-version: #1



execute @s[tag=staffstatus] ~~~ function UAC/asset/rules
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
