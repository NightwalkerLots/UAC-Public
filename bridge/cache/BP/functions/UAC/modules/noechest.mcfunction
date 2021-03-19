{
	"file_path": "C:\\Users\\night\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\minecraftWorlds\\g-4hYI7KCAA=\\behavior_packs\\behavior_packs(1)\\functions\\UAC\\modules\\noechest.mcfunction",
	"file_type": "unknown",
	"format_version": 0,
	"file_uuid": "7588c907_9eb2_4a5c_aa0b_c549e3258d45",
	"file_version": 12,
	"cache_content": "function UAC/asset/echestdisable\r\nexecute @a[tag=!staffstatus] ~ ~ ~ fill ~15 ~15 ~15 ~-15 ~-15 ~-15 air 0 replace ender_chest\r\n\r\n#Adds a tag for the enabled/disabled check\r\ntag @a[tag=staffstatus] add noechestmodule\r\n\r\n#This hides this from the in-game function command directory\r\nexecute @f ~~~ hide\r\ntag @f[tag=\"\"] add hide"
}