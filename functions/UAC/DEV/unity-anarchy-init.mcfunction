execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set acmtoggledummy acmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a acmtoggle = acmtoggledummy acmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set acmtoggledummy ACM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set bbmtoggledummy bbmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a bbmtoggle = bbmtoggledummy bbmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set bbmtoggledummy BBM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set BDXdummy Deathef 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a dethtoggle = dethtoggledummy dethtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a Deathef = BDXdummy Deathef
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set dethtoggledummy dethtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set ssmtoggledummy ssmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a ssmtoggle = ssmtoggledummy ssmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set ssmtoggledummy SSM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set hmmtoggledummy hmmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a hmmtoggle = hmmtoggledummy hmmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set hmmtoggledummy HMM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set ibmtoggledummy ibmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a ibmtoggle = ibmtoggledummy ibmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set ibmtoggledummy IBM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set ltmtoggledummy ltmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a ltmtoggle = ltmtoggledummy ltmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set ltmtoggledummy LTM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set nfmtoggledummy nfmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a nfmtoggle = nfmtoggledummy nfmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set nfmtoggledummy NFM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set opamtoggledummy opamtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a opamtoggle = opamtoggledummy opamtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set opamtoggledummy OPAM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set rsmtoggledummy rsmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a rsmtoggle = rsmtoggledummy rsmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set rsmtoggledummy RSM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set tpmtoggledummy tpmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a tpmtoggle = tpmtoggledummy tpmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set tpmtoggledummy TPM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set uoimtoggledummy uoimtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a uoimtoggle = uoimtoggledummy uoimtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set uoimtoggledummy UOIM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set wbmtoggledummy wbmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a wbmtoggle = wbmtoggledummy wbmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set wbmtoggledummy WBM 1

execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players set BNCBdummy BNCB 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players operation @a BNCB = BNCBdummy BNCB
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players set @a BNCB 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players set BNMdummy BNM 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players operation @a BNM = BNMdummy BNM
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players set @a BNM 1

execute @s[tag=staffstatus,scores={wbmtoggle=1},name=nightwalkerlots] ~~~ scoreboard players set BDXdummy Border_Coord_X 80000
execute @s[tag=staffstatus,scores={wbmtoggle=1},name=nightwalkerlots] ~~~ scoreboard players set BDXdummy Border_Coord_Z 80000
execute @s[tag=staffstatus,scores={wbmtoggle=1},name=nightwalkerlots] ~~~ scoreboard players operation @a Border_Coord_Z = BDXdummy Border_Coord_Z
execute @s[tag=staffstatus,scores={wbmtoggle=1},name=nightwalkerlots] ~~~ scoreboard players operation @a Border_Coord_X = BDXdummy Border_Coord_X

tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► The §2Developer Anarchy Toggle §bhas been used by §d"},{"selector":"@s"}]}

scoreboard players set @s lstcmd 3

#Deny NonDeveloper
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
