scoreboard players remove @s combat_timer 1
scoreboard players operation @s[scores={hometp=!711}] hmmcache = @s hometp 
scoreboard players set @s[scores={hometp=!711,combat_timer=10..}] hometp 711
execute @s[scores={hometp=711,combat_timer=550..600}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §c❚❚❚❚❚❚❚❚❚❚
execute @s[scores={hometp=711,combat_timer=500..550}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚§c❚❚❚❚❚❚❚❚❚
execute @s[scores={hometp=711,combat_timer=450..500}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚❚§c❚❚❚❚❚❚❚❚
execute @s[scores={hometp=711,combat_timer=400..450}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚❚❚§c❚❚❚❚❚❚❚
execute @s[scores={hometp=711,combat_timer=350..400}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚§c❚❚❚❚❚❚
execute @s[scores={hometp=711,combat_timer=300..350}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚§c❚❚❚❚❚
execute @s[scores={hometp=711,combat_timer=250..300}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚§c❚❚❚❚
execute @s[scores={hometp=711,combat_timer=200..250}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚❚§c❚❚❚
execute @s[scores={hometp=711,combat_timer=150..200}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚❚❚§c❚❚
execute @s[scores={hometp=711,combat_timer=100..150}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚❚❚❚§c❚
execute @s[scores={hometp=711,combat_timer=50..100}] ~~~ title @s actionbar §¶§dCOMBAT LOG TIMER§7: §2❚❚❚❚❚❚❚❚❚❚
execute @s[scores={hometp=711,combat_timer=10..15}] ~~~ title @s actionbar §¶§dNO LONGER IN COMBAT

scoreboard players operation @s[scores={combat_timer=5..6}] hometp = @s hmmcache
scoreboard players set @s[scores={combat_timer=1..4}] combat_timer 0
scoreboard players set @s[scores={combat_timer=0}] in_combat 0




//