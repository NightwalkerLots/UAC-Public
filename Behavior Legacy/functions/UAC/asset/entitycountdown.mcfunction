execute @s[scores={entityclear=350}] ~~~  tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c5"}]}
execute @s[scores={entityclear=300}] ~~~  tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c4"}]}
execute @s[scores={entityclear=250}] ~~~  tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c3"}]}
execute @s[scores={entityclear=200}] ~~~  tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c2"}]}
execute @s[scores={entityclear=150}] ~~~  tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Clearing Entities in §c1"}]}
execute @s[scores={entityclear=100}] ~~~  function UAC/packages/autolagclearasset
execute @s[scores={entityclear=40}] ~~~  tag @a remove entclear
hide