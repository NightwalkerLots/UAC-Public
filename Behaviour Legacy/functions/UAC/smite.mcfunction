#Checks to see if victem is staff
execute as @s[tag=staffstatus] at @s run tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §bUnable to use smite on §d"},{"selector":"@s"},{"text":" §¶§bbecause they are staff."}]}

#Smite players
execute as @s[tag=!staffstatus] at @s run tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§bwas smited by a operator"}]}
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s positioned ~~3~ run summon lightning_bolt
execute as @s[tag=!staffstatus] at @s run function particle/totem_poof
playsound note.bass @a ~ ~ ~

scoreboard players set @s lstcmd 20

execute as @s[tag=!staffstatus] at @s run kill @s
