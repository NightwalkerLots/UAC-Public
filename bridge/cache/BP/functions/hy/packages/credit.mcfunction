{
	"file_path": "C:\\Users\\James\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Hydra AntiCheat v2\\functions\\hy\\packages\\credit.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "8154c643_5153_4316_9f07_7d032bc0d062",
	"file_version": 29,
	"cache_content": "hide\r\nscoreboard players add @a credit 0\r\nexecute @a[scores={credit=0}] ~ ~ ~ scoreboard players add @s counter 1\r\nexecute @a[scores={credit=0}] ~ ~ ~  execute @s[scores={counter=100}] ~ ~ ~ title @s title §¶§cThis Server is Running Hydra\r\nexecute @a[scores={credit=0}] ~ ~ ~  execute @s[scores={counter=100}] ~ ~ ~ title @s subtitle §¶§chttps://discord.gg/yfcmFz\r\nexecute @a[scores={credit=0}] ~ ~ ~  execute @s[scores={counter=100}] ~ ~ ~ tellraw @p {\"rawtext\":[{\"text\":\"§¶§c⋰         This Server is Running Hydra          ⋱\\n⋮        Discord: https://discord.gg/yfcmFz        ⋮\\n⋱    Github: https://github.com/FeedFall8/Hydra   ⋰\"}]}\r\nexecute @a[scores={credit=0}] ~ ~ ~  execute @s[scores={counter=100}] ~ ~ ~  scoreboard players set @p credit 1"
}