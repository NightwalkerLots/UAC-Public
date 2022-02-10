#Checks to see if victem is staff
execute @s[tag=staffstatus] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §bUnable to use smite on §d"},{"selector":"@s"},{"text":" §¶§bbecause they are staff."}]}

#Smite players
execute @s[tag=!staffstatus] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§bwas smited by a operator"}]}
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~3~ summon lightning_bolt
execute @s[tag=!staffstatus] ~~~ function particle/totem_poof
playsound note.bass @a ~ ~ ~

scoreboard players set @s lstcmd 20

execute @s[tag=!staffstatus] ~~~ kill @s
