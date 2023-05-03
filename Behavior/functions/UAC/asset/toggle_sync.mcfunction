#This syncs all toggle values for everyone

#wb size
execute @a[scores={wbmtoggle=1}] ~~~ scoreboard players operation @a Border_Coord_Z = BDXdummy Border_Coord_Z
execute @a[scores={wbmtoggle=1}] ~~~ scoreboard players operation @a Border_Coord_X = BDXdummy Border_Coord_X

#Sync World Spawn Configuration Coords
scoreboard players operation @a Worldx = worlddum Worldx
scoreboard players operation @a Worldy = worlddum Worldy
scoreboard players operation @a Worldz = worlddum Worldz
scoreboard players operation @a worldcustom = worlddum worldcustom


#module toggles
scoreboard players operation @a afmtoggle = afmtoggledummy afmtoggle
scoreboard players operation @a AFM = afmtoggledummy AFM
scoreboard players operation @a bbmtoggle = bbmtoggledummy bbmtoggle
scoreboard players operation @a BBM = bbmtoggledummy BBM
scoreboard players operation @a dethtoggle = dethtoggledummy dethtoggle
scoreboard players operation @a Deathef = BDXdummy Deathef
scoreboard players operation @a SSM = ssmtoggledummy SSM
scoreboard players operation @a ssmtoggle = ssmtoggledummy ssmtoggle
scoreboard players operation @a HMM = hmmtoggledummy HMM
scoreboard players operation @a hmmtoggle = hmmtoggledummy hmmtoggle
scoreboard players operation @a IBM = ibmtoggledummy IBM
scoreboard players operation @a ibmtoggle = ibmtoggledummy ibmtoggle
scoreboard players operation @a ICM = icmtoggledummy ICM
scoreboard players operation @a icmtoggle = icmtoggledummy icmtoggle
scoreboard players operation @a LTM = ltmtoggledummy LTM
scoreboard players operation @a ltmtoggle = ltmtoggledummy ltmtoggle
scoreboard players operation @a MDM = mdmtoggledummy MDM
scoreboard players operation @a mdmtoggle = mdmtoggledummy mdmtoggle
scoreboard players operation @a NEM = nemtoggledummy NEM
scoreboard players operation @a nemtoggle = nemtoggledummy nemtoggle
scoreboard players operation @a OPAM = opamtoggledummy OPAM
scoreboard players operation @a opamtoggle = opamtoggledummy opamtoggle
scoreboard players operation @a RSM = rsmtoggledummy RSM
scoreboard players operation @a rsmtoggle = rsmtoggledummy rsmtoggle
scoreboard players operation @a TPM = tpmtoggledummy TPM
scoreboard players operation @a tpmtoggle = tpmtoggledummy tpmtoggle
scoreboard players operation @a UOIM = uoimtoggledummy UOIM
scoreboard players operation @a uoimtoggle = uoimtoggledummy uoimtoggle
scoreboard players operation @a WBM = wbmtoggledummy WBM
scoreboard players operation @a wbmtoggle = wbmtoggledummy wbmtoggle
scoreboard players operation @a armtoggle = armtoggledummy armtoggle
scoreboard players operation @a afkm = afkdummy afkm
scoreboard players operation @a opstoggle = opsdummy opstoggle
scoreboard players operation @a clmtoggle = clmdummy clmtoggle
scoreboard players operation @a illench = illenchdummy illench
scoreboard players operation @a chatrank = crdummy chatrank
scoreboard players operation @a arm_gt_toggle = armdummy arm_gt_toggle
scoreboard players operation @a acstoggle = acsdummy acstoggle
scoreboard players operation @a ajmtoggle = ajmdummy ajmtoggle
scoreboard players operation @a almtoggle = almdummy almtoggle
scoreboard players operation @a testin = testindummy testin

#Syncs the method used for Anti-Reach
scoreboard players set @a[scores={arm_gt_toggle=1}] armtoggle 0

#Ore Alert toggles
scoreboard players operation @a diamondmd = mdmtoggledummy diamondmd
scoreboard players operation @a goldmd = mdmtoggledummy goldmd
scoreboard players operation @a lapizmd = mdmtoggledummy lapizmd
scoreboard players operation @a scrapmd = mdmtoggledummy scrapmd
scoreboard players operation @a emeraldmd = mdmtoggledummy emeraldmd
scoreboard players operation @a ironmd = mdmtoggledummy ironmd


scoreboard players operation @a Deathef = BDXdummy Deathef
scoreboard players operation @a dethtoggle = dethtoggledummy dethtoggle
scoreboard players operation @a mdmtoggle = mdmtoggledummy mdmtoggle

#precache all itemban toggled items
scoreboard players operation @a BNA = BNAdummy BNA
scoreboard players operation @a BNM = BNMdummy BNM
scoreboard players operation @a BNCB = BNcbdummy BNCB
scoreboard players operation @a BNSB = BNsbdummy BNSB
scoreboard players operation @a BNBQ = BNBQdummy BNBQ
scoreboard players operation @a BNTN = BNTNummy BNTN
scoreboard players operation @a BNTD = BNTDdummy BNTD

scoreboard players operation @a pvp = pvpdummy pvp
scoreboard players set @s in_nether 0
scoreboard players set @s in_end 0
scoreboard players set @s riding 0
scoreboard players set @s[m=survival] gamemode 0
scoreboard players set @s[m=creative] gamemode 1
scoreboard players set @s[m=adventure] gamemode 2
scoreboard players set @s[m=spectator] gamemode 3


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
