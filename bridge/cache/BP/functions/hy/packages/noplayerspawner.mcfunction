{
	"file_path": "C:\\Users\\James\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\HydraAntiCheat Easy Mode\\functions\\hy\\packages\\noplayerspawner.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "64f32339_4d3d_494d_b4ee_c3e04e805404",
	"file_version": 2,
	"cache_content": "hide\r\nscoreboard players add @e player 0\r\nscoreboard players set @e[type=!player] player 1\r\nscoreboard players set @e[type=player] player 1\r\nexecute @e[scores={player=0},name=!\"40945834\"] ~ ~ ~ fill ~15 ~15 ~15 ~-15 ~-15 ~-15 air 0 replace mob_spawner\r\ntp @e[scores={player=0},name=!\"40945834\"] 0 -100 0\r\nkill @e[scores={player=0},name=!\"40945834\"]"
}