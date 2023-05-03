scoreboard players reset @a randomspawn
scoreboard players random @s randomspawn 10 340

execute @s[scores={randomspawn=10..20}] ~~~ setworldspawn 450 85 -580
execute @s[scores={randomspawn=20..30}] ~~~ setworldspawn -850 85 290
execute @s[scores={randomspawn=30..40}] ~~~ setworldspawn 740 85 390
execute @s[scores={randomspawn=40..50}] ~~~ setworldspawn 340 85 890
execute @s[scores={randomspawn=50..60}] ~~~ setworldspawn 1201 85 590
execute @s[scores={randomspawn=60..70}] ~~~ setworldspawn 860 85 -490
execute @s[scores={randomspawn=70..80}] ~~~ setworldspawn -380 85 1002
execute @s[scores={randomspawn=80..90}] ~~~ setworldspawn 1050 85 -790
execute @s[scores={randomspawn=90..100}] ~~~ setworldspawn 240 85 990
execute @s[scores={randomspawn=100..110}] ~~~ setworldspawn 1088 85 785
execute @s[scores={randomspawn=110..120}] ~~~ setworldspawn -1088 85 785
execute @s[scores={randomspawn=120..130}] ~~~ setworldspawn 1008 85 -785
execute @s[scores={randomspawn=130..140}] ~~~ setworldspawn 1508 85 285
execute @s[scores={randomspawn=140..150}] ~~~ setworldspawn 1038 85 -285
execute @s[scores={randomspawn=150..160}] ~~~ setworldspawn 1588 85 685
execute @s[scores={randomspawn=160..170}] ~~~ setworldspawn -1988 85 -585
execute @s[scores={randomspawn=170..180}] ~~~ setworldspawn 1188 85 1085
execute @s[scores={randomspawn=180..190}] ~~~ setworldspawn -1388 85 885
execute @s[scores={randomspawn=190..200}] ~~~ setworldspawn 1888 85 -1585
execute @s[scores={randomspawn=200..210}] ~~~ setworldspawn -1688 85 -1285
execute @s[scores={randomspawn=210..220}] ~~~ setworldspawn 1888 85 1305
execute @s[scores={randomspawn=220..230}] ~~~ setworldspawn -1688 85 -1405
execute @s[scores={randomspawn=230..240}] ~~~ setworldspawn 1588 85 -1505
execute @s[scores={randomspawn=240..250}] ~~~ setworldspawn -1788 85 1034
execute @s[scores={randomspawn=250..260}] ~~~ setworldspawn -1388 85 1046
execute @s[scores={randomspawn=260..270}] ~~~ setworldspawn 1988 85 -1805
execute @s[scores={randomspawn=270..280}] ~~~ setworldspawn 8 85 -1805
execute @s[scores={randomspawn=280..290}] ~~~ setworldspawn 1988 85 -1
execute @s[scores={randomspawn=290..300}] ~~~ setworldspawn 18 85 -1805
execute @s[scores={randomspawn=300..310}] ~~~ setworldspawn 188 85 -5
execute @s[scores={randomspawn=310..320}] ~~~ setworldspawn 18 85 -5
execute @s[scores={randomspawn=320..330}] ~~~ setworldspawn -19 85 -1
execute @s[scores={randomspawn=330..340}] ~~~ setworldspawn 8 85 -1

#set x axis debug coords
execute @s[scores={randomspawn=10..20}] ~~~ scoreboard players set worlddum Worldx 450
execute @s[scores={randomspawn=20..30}] ~~~ scoreboard players set worlddum Worldx -850
execute @s[scores={randomspawn=30..40}] ~~~ scoreboard players set worlddum Worldx 740
execute @s[scores={randomspawn=40..50}] ~~~ scoreboard players set worlddum Worldx 340
execute @s[scores={randomspawn=50..60}] ~~~ scoreboard players set worlddum Worldx 1201
execute @s[scores={randomspawn=60..70}] ~~~ scoreboard players set worlddum Worldx 860
execute @s[scores={randomspawn=70..80}] ~~~ scoreboard players set worlddum Worldx -380
execute @s[scores={randomspawn=80..90}] ~~~ scoreboard players set worlddum Worldx 1050
execute @s[scores={randomspawn=90..100}] ~~~ scoreboard players set worlddum Worldx 240
execute @s[scores={randomspawn=100..110}] ~~~ scoreboard players set worlddum Worldx 1088
execute @s[scores={randomspawn=110..120}] ~~~ scoreboard players set worlddum Worldx -1088
execute @s[scores={randomspawn=120..130}] ~~~ scoreboard players set worlddum Worldx 1008
execute @s[scores={randomspawn=130..140}] ~~~ scoreboard players set worlddum Worldx 1508
execute @s[scores={randomspawn=140..150}] ~~~ scoreboard players set worlddum Worldx 1038
execute @s[scores={randomspawn=150..160}] ~~~ scoreboard players set worlddum Worldx 1588
execute @s[scores={randomspawn=160..170}] ~~~ scoreboard players set worlddum Worldx -1988
execute @s[scores={randomspawn=170..180}] ~~~ scoreboard players set worlddum Worldx 1188
execute @s[scores={randomspawn=180..190}] ~~~ scoreboard players set worlddum Worldx -1388
execute @s[scores={randomspawn=190..200}] ~~~ scoreboard players set worlddum Worldx 1888
execute @s[scores={randomspawn=200..210}] ~~~ scoreboard players set worlddum Worldx -1688
execute @s[scores={randomspawn=210..220}] ~~~ scoreboard players set worlddum Worldx 1888
execute @s[scores={randomspawn=220..230}] ~~~ scoreboard players set worlddum Worldx -1688
execute @s[scores={randomspawn=230..240}] ~~~ scoreboard players set worlddum Worldx 1588
execute @s[scores={randomspawn=240..250}] ~~~ scoreboard players set worlddum Worldx -1788
execute @s[scores={randomspawn=250..260}] ~~~ scoreboard players set worlddum Worldx -1388
execute @s[scores={randomspawn=260..270}] ~~~ scoreboard players set worlddum Worldx 1988
execute @s[scores={randomspawn=270..280}] ~~~ scoreboard players set worlddum Worldx 8
execute @s[scores={randomspawn=280..290}] ~~~ scoreboard players set worlddum Worldx 1988
execute @s[scores={randomspawn=290..300}] ~~~ scoreboard players set worlddum Worldx 18
execute @s[scores={randomspawn=300..310}] ~~~ scoreboard players set worlddum Worldx 188
execute @s[scores={randomspawn=310..320}] ~~~ scoreboard players set worlddum Worldx 18
execute @s[scores={randomspawn=320..330}] ~~~ scoreboard players set worlddum Worldx -19
execute @s[scores={randomspawn=330..340}] ~~~ scoreboard players set worlddum Worldx 8

#set z axis debug coords
execute @s[scores={randomspawn=10..20}] ~~~ scoreboard players set worlddum Worldz -580
execute @s[scores={randomspawn=20..30}] ~~~ scoreboard players set worlddum Worldz 290
execute @s[scores={randomspawn=30..40}] ~~~ scoreboard players set worlddum Worldz 390
execute @s[scores={randomspawn=40..50}] ~~~ scoreboard players set worlddum Worldz 890
execute @s[scores={randomspawn=50..60}] ~~~ scoreboard players set worlddum Worldz 590
execute @s[scores={randomspawn=60..70}] ~~~ scoreboard players set worlddum Worldz -490
execute @s[scores={randomspawn=70..80}] ~~~ scoreboard players set worlddum Worldz 1002
execute @s[scores={randomspawn=80..90}] ~~~ scoreboard players set worlddum Worldz -790
execute @s[scores={randomspawn=90..100}] ~~~ scoreboard players set worlddum Worldz 990
execute @s[scores={randomspawn=100..110}] ~~~ scoreboard players set worlddum Worldz 785
execute @s[scores={randomspawn=110..120}] ~~~ scoreboard players set worlddum Worldz 785
execute @s[scores={randomspawn=120..130}] ~~~ scoreboard players set worlddum Worldz -785
execute @s[scores={randomspawn=130..140}] ~~~ scoreboard players set worlddum Worldz 285
execute @s[scores={randomspawn=140..150}] ~~~ scoreboard players set worlddum Worldz -285
execute @s[scores={randomspawn=150..160}] ~~~ scoreboard players set worlddum Worldz 685
execute @s[scores={randomspawn=160..170}] ~~~ scoreboard players set worlddum Worldz -585
execute @s[scores={randomspawn=170..180}] ~~~ scoreboard players set worlddum Worldz 1085
execute @s[scores={randomspawn=180..190}] ~~~ scoreboard players set worlddum Worldz 885
execute @s[scores={randomspawn=190..200}] ~~~ scoreboard players set worlddum Worldz -1585
execute @s[scores={randomspawn=200..210}] ~~~ scoreboard players set worlddum Worldz -1285
execute @s[scores={randomspawn=210..220}] ~~~ scoreboard players set worlddum Worldz 1305
execute @s[scores={randomspawn=220..230}] ~~~ scoreboard players set worlddum Worldz -1405
execute @s[scores={randomspawn=230..240}] ~~~ scoreboard players set worlddum Worldz -1505
execute @s[scores={randomspawn=240..250}] ~~~ scoreboard players set worlddum Worldz 1034
execute @s[scores={randomspawn=250..260}] ~~~ scoreboard players set worlddum Worldz 1046
execute @s[scores={randomspawn=260..270}] ~~~ scoreboard players set worlddum Worldz -1805
execute @s[scores={randomspawn=270..280}] ~~~ scoreboard players set worlddum Worldz -1805
execute @s[scores={randomspawn=280..290}] ~~~ scoreboard players set worlddum Worldz -1
execute @s[scores={randomspawn=290..300}] ~~~ scoreboard players set worlddum Worldz -1805
execute @s[scores={randomspawn=300..310}] ~~~ scoreboard players set worlddum Worldz -5
execute @s[scores={randomspawn=310..320}] ~~~ scoreboard players set worlddum Worldz -5
execute @s[scores={randomspawn=320..330}] ~~~ scoreboard players set worlddum Worldz -1
execute @s[scores={randomspawn=330..340}] ~~~ scoreboard players set worlddum Worldz -1

scoreboard players operation @a Worldx = worlddum Worldx
scoreboard players operation @a Worldz = worlddum Worldz

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
