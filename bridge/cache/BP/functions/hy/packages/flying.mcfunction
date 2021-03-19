{
	"file_path": "C:\\Users\\James\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\HydraAntiCheat Easy Mode\\functions\\hy\\packages\\flying.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "e51d20ea_713e_4e38_a18b_5049f07dc88a",
	"file_version": 24,
	"cache_content": "hide\r\n#fixed & improved by romanmender, consept by Xorkent on yt\r\nexecute @p ~~~ execute @s ~ ~ ~ detect ~ ~-2 ~ air 0 tag @s add flying\r\nexecute @p ~~~ execute @s[tag=staff] ~ ~ ~ tag @s remove flying\r\nexecute @p ~~~ execute @s[tag=bypass] ~ ~ ~ tag @s remove flying\r\nexecute @p ~~~ execute @s[m=c] ~ ~ ~ tag @s remove flying\r\nscoreboard players add @p[tag=flying] tempkick 2\r\ntag @a remove flying"
}