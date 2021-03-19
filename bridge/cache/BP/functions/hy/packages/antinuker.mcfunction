{
	"file_path": "C:\\Users\\James\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\HydraAntiCheat Easy Mode\\functions\\hy\\packages\\antinuker.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "5840423e_ea97_4763_9ac6_9a9d59b31242",
	"file_version": 6,
	"cache_content": "hide\r\nscoreboard players set @a items 0\r\nexecute @a ~ ~ ~ execute @e[type=item] ~ ~ ~ scoreboard players add @p[r=30] items 1\r\nexecute @a[scores={items=50..}] ~ ~ ~ kill @e[type=item,r=20]\r\nscoreboard players set @a[scores={items=75..}] tempkick 1"
}