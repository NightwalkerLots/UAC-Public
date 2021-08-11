scoreboard players set @a ACM 0
scoreboard players set @a AFM 0
scoreboard players set @a APM 0
scoreboard players set @a BBM 0
scoreboard players set @a SEM 0
scoreboard players set @a ELPM 0
scoreboard players set @a HMM 0
scoreboard players set @a ICM 0
scoreboard players set @a KPVPM 0
scoreboard players set @a LTM 0
scoreboard players set @a NEM 0
scoreboard players set @a NFM 0
scoreboard players set @a OPAM 0
scoreboard players set @a RSM 0
scoreboard players set @a RTM 0
scoreboard players set @a SSM 0
scoreboard players set @a TPM 0
scoreboard players set @a VIPM 0
scoreboard players set @a WBM 0
scoreboard players set @a UOIM 0


execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Status of all modules have been refreshed"}]}


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
