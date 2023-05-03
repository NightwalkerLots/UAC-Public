execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":" §¶§bis staff and cannot be punished"}]}
execute @s[tag=!staffstatus] ~~~ function UAC/asset/punish_asset
execute @s[tag=!staffstatus] ~~~ function particle/explode
execute @s[tag=!staffstatus] ~~~ playsound mob.wither.break_block @s ~~~ 3 1 4