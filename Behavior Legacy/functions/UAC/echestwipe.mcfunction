#bridge-file-version: #3
execute @s[tag=!staffstatus] ~~~ function UAC/asset/echestwipe
execute @s[tag=!staffstatus] ~ ~ ~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector": "@s"},{"text":"'s §bEnderchest was cleared by a operator"}]}

execute @s[tag=staffstatus] ~ ~ ~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF ► §d"},{"selector": "@s"},{"text":" §bis staff and can't be cleared"}]}
