structure load AdminUnbreakableDiamondLegit ~~~ 0_degrees 
tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bspawned a Diamond Unbreakable Admin Kit"}]}

execute @a[tag=staffstatus] ~~~ function particle/explode
execute @a[tag=staffstatus] ~~~ playsound random.enderchestopen @s ~~~ 2 1 3