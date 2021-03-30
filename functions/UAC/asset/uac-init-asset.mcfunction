
#This adds all the scoreboard stuff we need
scoreboard objectives add warn dummy warn
scoreboard objectives add warnillegal dummy warnillegal
scoreboard objectives add staff dummy §¶§bStaff
scoreboard objectives setdisplay belowname staff
scoreboard objectives add lagtimer dummy lagtimer
scoreboard objectives add hometimer dummy hometimer
scoreboard objectives add rulestimer dummy rulestimer
scoreboard objectives add timeplayed dummy timeplayed
scoreboard objectives add timealive dummy timealive
scoreboard objectives add uac dummy uac
scoreboard objectives add deaths dummy deaths
scoreboard objectives add kills dummy kills
scoreboard objectives add killstreak dummy killstreak
scoreboard objectives add randomspawn dummy randomspawn
scoreboard objectives add cleararealarge dummy cleararealargelarge
scoreboard objectives add cbespawn dummy cbespawn
scoreboard objectives add flycount dummy flycount
scoreboard objectives add flyreset dummy flyreset
scoreboard objectives add phasecount dummy phasecount
scoreboard objectives add hometp dummy hometp
scoreboard objectives add welcomed dummy welcomed
scoreboard objectives add entitycount dummy entitycount
scoreboard objectives add vip dummy vip


#module scoreboards
scoreboard objectives add ACM dummy ACM
scoreboard objectives add AFM dummy AFM
scoreboard objectives add APM dummy APM
scoreboard objectives add BBM dummy BBM
scoreboard objectives add SEM dummy SEM
scoreboard objectives add ELPM dummy ELPM
scoreboard objectives add HMM dummy HMM
scoreboard objectives add ICM dummy ICM
scoreboard objectives add KPVPM dummy KPVPM
scoreboard objectives add LTM dummy LTM
scoreboard objectives add NEM dummy NEM
scoreboard objectives add NFM dummy NFM
scoreboard objectives add OPAM dummy OPAM
scoreboard objectives add RSM dummy RSM
scoreboard objectives add RTM dummy RTM
scoreboard objectives add SSM dummy SSM
scoreboard objectives add TPM dummy TPM
scoreboard objectives add VIPM dummy VIPM
scoreboard objectives add WBM dummy WBM
scoreboard objectives add UOIM dummy UOIM

#Module Toggles
scoreboard objectives add SSDEBUG dummy SSDEBUG
scoreboard objectives add afmtoggle dummy afmtoggle
scoreboard objectives add acmtoggle dummy acmtoggle
scoreboard objectives add bbmtoggle dummy bbmtoggle
scoreboard objectives add semtoggle dummy semtoggle
scoreboard objectives add elpmtoggle dummy elpmtoggle
scoreboard objectives add hmmtoggle dummy hmmtoggle
scoreboard objectives add icmtoggle dummy icmtoggle
scoreboard objectives add kpvpmtoggle dummy kpvpmtoggle
scoreboard objectives add ltmtoggle dummy ltmtoggle
scoreboard objectives add nemtoggle dummy nemtoggle
scoreboard objectives add nfmtoggle dummy nfmtoggle
scoreboard objectives add opamtoggle dummy opamtoggle
scoreboard objectives add rsmtoggle dummy rsmtoggle
scoreboard objectives add rtmtoggle dummy rtmtoggle
scoreboard objectives add ssmtoggle dummy ssmtoggle
scoreboard objectives add tpmtoggle dummy tpmtoggle
scoreboard objectives add vipmtoggle dummy vipmtoggle
scoreboard objectives add wbmtoggle dummy wbmtoggle
scoreboard objectives add uoimtoggle dummy uoimtoggle

#Fake Staff Protection
scoreboard objectives add 2DI3N dummy 203knK
scoreboard objectives add 39SN230 dummy D93N3ND
scoreboard objectives add GFS98 dummy 23LHNK
scoreboard objectives add D98AD dummy 9DAU32
scoreboard objectives add I2IO2NO dummy 7D798D8

#Current Worldspawn debug
scoreboard objectives add x-axis dummy x-axis
scoreboard objectives add z-axis dummy y-axis

#Default Toggles
scoreboard players set @s SSDEBUG 0
scoreboard players set @s acmtoggle 0
scoreboard players set @s bbmtoggle 0
scoreboard players set @s semtoggle 0
scoreboard players set @s elpmtoggle 0
scoreboard players set @s hmmtoggle 0
scoreboard players set @s icmtoggle 0
scoreboard players set @s kpvpmtoggle 0
scoreboard players set @s ltmtoggle 0
scoreboard players set @s nemtoggle 0
scoreboard players set @s nfmtoggle 0
scoreboard players set @s opamtoggle 0
scoreboard players set @s rsmtoggle 0
scoreboard players set @s rtmtoggle 0
scoreboard players set @s ssmtoggle 0
scoreboard players set @s tpmtoggle 0
scoreboard players set @s vipmtoggle 0
scoreboard players set @s wbmtoggle 0
scoreboard players set @s uoimtoggle 0

#Give everyone default module scoreboard scores
scoreboard players set @s ACM 0
scoreboard players set @s AFM 0
scoreboard players set @s APM 0
scoreboard players set @s BBM 0
scoreboard players set @s SEM 0
scoreboard players set @s ELPM 0
scoreboard players set @s HMM 0
scoreboard players set @s ICM 0
scoreboard players set @s KPVPM 0
scoreboard players set @s LTM 0
scoreboard players set @s NEM 0
scoreboard players set @s NFM 0
scoreboard players set @s OPAM 0
scoreboard players set @s RSM 0
scoreboard players set @s RTM 0
scoreboard players set @s SSM 0
scoreboard players set @s TPM 0
scoreboard players set @s VIPM 0
scoreboard players set @s WBM 0
scoreboard players set @s UOIM 0

#Staff Protection
scoreboard players set @s[tag=!staffstatus] 2DI3N 0
scoreboard players set @s[tag=!staffstatus] 39SN230 0
scoreboard players set @s[tag=!staffstatus] GFS98 0
scoreboard players set @s[tag=!staffstatus] D98AD 0
scoreboard players set @s[tag=!staffstatus] I2IO2NO 0

#Public Hotbar Lock
scoreboard players set hmmtoggledummy hmmtoggle 1
scoreboard players operation @s hmmtoggle = hmmtoggledummy hmmtoggle
scoreboard players set @s HMM 1

#Other utiltiy
execute @s[tag=vipmodule] ~~~ scoreboard objectives add vip dummy §¶§5VIP
execute @s[tag=vipmodule] ~~~ scoreboard objectives setdisplay sidebar vip
gamerule functioncommandlimit 10000
gamerule commandblocksenabled true
scoreboard players set @s hometp 3
scoreboard players set @s opabusemodule 2


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
