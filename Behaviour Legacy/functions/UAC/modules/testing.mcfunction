#Test Features
execute @s[scores={hastorch=0,testin=1}] ~~~ fill ~10 ~-2 ~10 ~-10 ~2 ~-10 air 0 replace light_block
execute @s[scores={hastorch=1,testin=1,lagtimer=1}] ~~~ scoreboard players set @s hastorch 0
execute @s[scores={hastorch=1,testin=1,lagtimer=5}] ~~~ scoreboard players set @s hastorch 0
execute @s[scores={hastorch=1,testin=1,lagtimer=10}] ~~~ scoreboard players set @s hastorch 0
execute @s[scores={hastorch=1,testin=1,lagtimer=15}] ~~~ scoreboard players set @s hastorch 0
execute @s[scores={hastorch=1,testin=1,lagtimer=20}] ~~~ scoreboard players set @s hastorch 0
execute @s[scores={hastorch=1,testin=1,lagtimer=25}] ~~~ scoreboard players set @s hastorch 0
execute @s[scores={hastorch=1,testin=1,lagtimer=30}] ~~~ scoreboard players set @s hastorch 0

scoreboard players operation @s testin = testindummy testin

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
