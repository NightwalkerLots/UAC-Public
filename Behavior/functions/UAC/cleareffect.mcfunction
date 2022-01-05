#clearer
execute @s[tag=!staffstatus] ~~~ effect @s[tag=!staffstatus] clear 
#message
execute @s ~~~ me §¶§cUAC ► Effects Cleared by Operator

#utility
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ playsound note.pling @a ~ ~ ~
scoreboard players set @s lstcmd 26
