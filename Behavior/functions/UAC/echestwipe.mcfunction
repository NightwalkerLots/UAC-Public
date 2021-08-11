#bridge-file-version: #3
execute @s ~~~ function UAC/asset/echestwipe
execute @s ~~~ me §¶§cUAC ► EnderChest Cleared by Operator
execute @a[tag=staffstatus,scores={staff=1}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► Cleared Player's EnderChest"}]}
scoreboard players set @s lstcmd 12
