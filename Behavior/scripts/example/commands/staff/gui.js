//@ts-check
import { Player, world } from 'mojang-minecraft'
import { Server } from '../../../library/Minecraft.js';
import { ActionFormData, ModalFormData } from "mojang-minecraft-ui"
import scoreboard from "../../../library/utils/scoreboard.js"
import { tellrawStaff } from '../../../library/utils/prototype.js';
const { for: obj } = scoreboard.objective

const moduleRequires = ['has_xx', 'has_gt']
const moduleDefs = [
    {
        mname: 'AFK Kick',
        obj: ['afkm'],
        name: 'afkdummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Anti-CBE',
        obj: ['ACM', 'acmtoggle'],
        name: 'acmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Anti-CLog',
        obj: ['clmtoggle'],
        name: 'clmdummy',
        toggle: ['§cOFF', '§aKILL', '§aCLEAR'],
        require: 'has_xx'
    },
    {
        mname: 'Anti-EnderChest',
        obj: ['NEM', 'nemtoggle'],
        name: 'nemtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Anti-Fly',
        obj: ['AFM', 'afmtoggle'],
        name: 'afmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Anti-FrostWalker',
        obj: ['NFM', 'nfmtoggle'],
        name: 'nfmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Anti-OneShot',
        obj: ['OSM', 'osmtoggle'],
        name: 'osmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx '
    },
    {
        mname: 'Anti-OP Abuse',
        obj: ['OPAM', 'opamtoggle'],
        name: 'opamtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Anti-Reach',
        obj: ['armtoggle'],
        name: 'armtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Bottom Bedrock',
        obj: ['BBM', 'bbmtoggle'],
        name: 'bbmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Death Toggle',
        obj: ['dethtoggle', 'Deathef'],
        name: 'dethtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Enchanted Armor Disable',
        obj: ['DAM', 'damtoggle'],
        name: 'damtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Fake Staff Protection',
        obj: ['SSM', 'ssmtoggle'],
        name: 'ssmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Hotbar Message',
        obj: ['HMM', 'hmmtoggle'],
        name: 'hmmtoggledummy',
        toggle: ['§cOFF', '§aWith Score', '§aWithout Score'],
        require: ''
    },
    {
        mname: 'Item Ban',
        obj: ['IBM', 'ibmtoggle'],
        name: 'ibmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Lag Clear',
        obj: ['LTM', 'ltmtoggle'],
        name: 'ltmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Mining Detection',
        obj: ['MDM', 'mdmtoggle'],
        name: 'mdmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Player Command',
        obj: ['ICM', 'icmtoggle'],
        name: 'icmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_gt'
    },
    {
        mname: 'Random Spawn',
        obj: ['RSM', 'rsmtoggle'],
        name: 'rsmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'Time Played',
        obj: ['TPM', 'tpmtoggle'],
        name: 'tpmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: ''
    },
    {
        mname: 'Unobtainable Items',
        obj: ['uoimtoggledummy'],
        name: 'UOIM',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    },
    {
        mname: 'World Border',
        obj: ['WBM', 'wbmtoggle'],
        name: 'wbmtoggledummy',
        toggle: ['§cOFF', '§aON'],
        require: 'has_xx'
    }
]
const itembanDefs = [
    { mname: 'Harming Arrow', obj: 'BNA', name: 'BNAdummy' },
    { mname: 'Book and Quill', obj: 'BNBQ', name: 'BNBQdummy' },
    { mname: 'Crossbow', obj: 'BNCB', name: 'BNCBdummy' },
    { mname: 'Maps', obj: 'BNM', name: 'BNMdummy' },
    { mname: 'Shulkerboxes', obj: 'BNSB', name: 'BNSBdummy' },
    { mname: 'TNT', obj: 'BNTN', name: 'BNMTNummy' },
    { mname: 'Trident', obj: 'BNTD', name: 'BNMTDummy'}
]
const oreBanDefs = [
    { mname:'Diamond', obj: 'diamondmd', name: 'mdmtoggledummy' },
    { mname:'Emerald', obj: 'emeraldmd', name: 'mdmtoggledummy' },
    { mname:'Gold', obj: 'goldmd', name: 'mdmtoggledummy' },
    { mname:'Iron', obj: 'ironmd', name: 'mdmtoggledummy' },
    { mname:'Lapis', obj: 'lapizmd', name: 'mdmtoggledummy' },
    { mname:'Netherite', obj: 'scrapmd', name: 'mdmtoggledummy '}
]
const kitDefs = [
    { mname: 'Netherite', structure: 'AdminNether' },
    { mname: 'ULegitNetherite', structure: 'AdminUnbreakableNetherlegit' },
    { mname: 'U32kNetherite', structure: 'AdminUnbreakableNether32k' },
    { mname: 'Diamond', structure: 'AdminDiamond' },
    { mname: 'ULegitDiamond', structure: 'AdminUnbreakableDiamondLegit' },
    { mname: 'U32kDiamond', structure: 'AdminUnbreakableDiamond32k' },
    { mname: 'Iron', structure: 'AdminIron' },
    { mname: 'ULegitIron', structure: 'AdminUnbreakableironlegit' },
    { mname: 'U32kIron', structure: 'AdminUnbreakableiron32k' },
]
const particleDefs = [
    { mname: 'Explode', fn: 'explode' },
    { mname: 'Nether Poof', fn: 'nether_poof_small' },
    { mname: 'Nether Poof Small', fn: 'nether_poof' },
    { mname: 'Totem Poof', fn: 'totem_poof' },
]

/** @type { (plr: Player, module: typeof moduleDefs[number], newValue?: number) => void } */
const setModule = (plr, module, newValue) => {
    const objdata = obj(module.obj[0]).dummies
    newValue ??= ( ( objdata.get(module.name) ?? 0 ) + 1 ) % module.toggle.length
    objdata.set(module.name, newValue)
    obj(module.obj[1]).dummies.set(module.name, newValue)
    tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has set the module §e${module.mname}§b to ${module.toggle[newValue]}`)
}

/** @type { (plr: Player) => 's' | 'c' | 'a' | 'sp' | 'hc' } */
const getGamemode = (plr) => {
    try { plr.runCommand('testfor @s[m=c]'); return 'c' } catch {}
    try { plr.runCommand('testfor @s[m=s]'); return 's' } catch {}
    try { plr.runCommand('testfor @s[m=a]'); return 'a' } catch {}
    return null
}

const guiScheme = {
    /** @type { (plr: Player) => void } */
    main: (() => { // main UI
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const actionList = [
            [ 'Modules'        , plr => guiScheme.toggle(plr) ],
            [ 'Item bans'      , plr => guiScheme.itemban(plr) ],
            [ 'Ore alerts'     , plr => guiScheme.oreban(plr) ],
            [ 'Kits'           , plr => guiScheme.kits(plr) ],
            [ 'Particles'      , plr => guiScheme.particles(plr) ],
            [ 'World Border'   , plr => guiScheme.worldborder(plr) ],
            [ 'Player Command' , plr => guiScheme.pcmd['new'](plr) ],
            [ 'More'           , plr => guiScheme.more(plr) ],
            [ 'Close'          , plr => {} ],
        ]
        const v = new ActionFormData()
            .title('Unity Anticheat')

        for (let [name, f] of actionList) v.button(name)
        
        return (plr) => void v.show(plr).then(v => {
            if (v.isCanceled) return
            actionList[v.selection][1](plr)
        })
    })(),

    pcmd: {
        /** @type { (plr: Player, target: Player) => void } */
        stats: (plr, target) => {
            const v = new ActionFormData()
                .title(`${target.name.replace(/§./g, '')}'s stats`)

            let text = []
            
            // location
            text.push('§l§eLocation')
            const plrFacing = obj('Player_Facing').players.get(target) // down up north south west east
            const plrCoord = [ 'X_Coordinate', 'Y_Coordinate','Z_Coordinate' ].map(v => obj(v).players.get(target) )
            const spawnCoord = [ 'X_Coord_S', 'Y_Coord_S', 'Z_Coord_S' ].map(v => obj(v).players.get(target) )
            const deathCoord = [ 'X_Coord_D', 'Y_Coord_D', 'Z_Coord_D' ].map(v => obj(v).players.get(target) )
            const playerDim = (() => {
                const in_nether = obj('in_nether').players.get(target)
                const in_end = obj('in_end').players.get(target)
                return in_nether ? 1 // 1: in nether
                    : in_end ? 2 // 2: in end
                    : 0 // overworld / unknoown
            })()

            text.push(`Location: ${plrCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`SpawnLoc: ${spawnCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`DeathLoc: ${deathCoord.map(v => `§a${v}§r`).join(', ')}`)
            text.push(`Facing: §b${
                plrFacing == 0 ? 'DOWN'
                : plrFacing == 1 ? 'UP'
                : plrFacing == 2 ? 'NORTH'
                : plrFacing == 3 ? 'SOUTH'
                : plrFacing == 4 ? 'WEST'
                : plrFacing == 5 ? 'EAST'
                : 'UNKNOWN'
            }`)
            text.push(`Dimension: §b${
                playerDim == 0 ? 'OVERWORLD'
                : playerDim == 1 ? 'NETHER'
                : playerDim == 2 ? 'END'
                : 'UNKNOWN'
            }`)
            text.push('') // newline

            // permissions
            text.push('§l§ePermissions')
            const isStaff = target.hasTag('staffstatus')
            const isOwner = target.hasTag('ownerstatus')
            const mayFly = obj('2KK001').players.get(target) == 725
            const isGodmode = target.hasTag('tgmGodMode')
            const gamemode = getGamemode(target)

            text.push(`Staff: ${isStaff ? '§aYes' : '§eNo'}`)
            text.push(`Owner: ${isOwner ? '§aYes' : '§eNo'}`)
            text.push(`Mayfly: ${mayFly ? '§aYes' : '§eNo'}`)
            text.push(`Godmode: ${isGodmode ? '§aYes' : '§eNo'}`)
            text.push(`Gamemode: §b${
                gamemode == 's' ? 'Survival'
                : gamemode == 'c' ? 'Creative'
                : gamemode == 'a' ? 'Adventure'
                : gamemode == 'sp' ? 'Spectator'
                : gamemode == 'hc' ? 'Hardcore'
                : 'Unknown'
            }`)
            text.push('') // newline

            // detections
            /** @type {[id: string, name: string, max: number][]} */
            const detections = [
                ['warn'        , 'Warns'              , 3],
                ['gmc_flag'    , 'GMC flags'          , 4],
                ['warnillegal' , 'Illegal item warns' , 9],
                ['warncbe'     , 'CBE warns'          , 9],
            ]
            text.push('§l§eDetections')
            for (let [id, name, max] of detections) text.push(`${name}:  §e${obj(id).players.get(target) ?? 0}§r / §e${max}§r`)

            text.push('') // newline

            // other
            text.push('§l§eOther')
            // pvp
            const kills = obj('kills').players.get(target),
                deaths = obj('deaths').players.get(target),
                killstreak = obj('killstreak').players.get(target)
            text.push(`Kills: §a${kills}`)
            text.push(`Deaths: §a${kills}`)
            text.push(`Killstreak: §a${kills}`)
            // time played
            const tpl = [
                obj('timeplayedsec').players.get(target),
                obj('timeplayedmin').players.get(target),
                obj('timeplayedhr').players.get(target),
                obj('timeplayedday').players.get(target)
            ]
            text.push(`Time played: §a${tpl[0]}d${tpl[1]}h${tpl[2]}m${tpl[3]}s`)

            v.body(text.join('\n§r'))
            v.button('Back')

            v.show(plr).then(evd => guiScheme.pcmd.exec(plr, target))
        },

        /** @type { (plr: Player, target: Player) => void } */
        exec: (plr, target) => { // Player command UI (exec)
            /** @type { [name: string, fn: () => void][] } */
            const actionList = [
                [ 'Stats'        , () => guiScheme.pcmd.stats(plr, target) ],
                [ 'Teleport'     , () => target.runCommand(`tp "${plr.name.replace(/\\|"/g, '\\$&')}" @s`) ],
                [ 'Punish'       , () => target.runCommand('function UAC/punish') ],
                [ 'Freeze'       , () => target.runCommand('function UAC/freeze_player') ],
                [ 'Warn'         , () => target.runCommand('function UAC/warn') ],
                [ 'E-Chest Wipe' , () => target.runCommand('function UAC/echestwipe') ],
                [ 'Reset Warn'   , () => target.runCommand('function UAC/warnreset') ],
                [ 'Ban'          , () => target.runCommand('tag @s add Ban') ],
                [ 'Smite'        , () => target.runCommand('function UAC/smite') ],
            ]

            const v = new ActionFormData()
                .title(`Player Command - ${target.name.replace(/§./g, '')}`)

            for (let [name, f] of actionList) v.button(name)

            v.show(plr).then(v => {
                if (v.isCanceled) return
                actionList[v.selection][1]()
            })
        },

        /** @type { (plr: Player, _a?: number) => void } */
        new: (plr, _a = 0) => { // Player command UI
            const pl = [...world.getPlayers()].filter(v => v !== plr)

            const v = new ModalFormData()
                .title('Player Command')
                .textField(
                    (
                        _a == 1 ? '§cPlayer not found.\n§r'
                        : _a == 2 ? '§cCannot target yourself.\n§r'
                        : ''
                    ) + 'Type in the player name. Leave blank to cancel',
                    'Player name'
                )
                .dropdown('Or select a player:', ['§8None§r', ...pl.map(v => v.name)])

            v.show(plr).then(v => {
                /** @type {string} */
                const input = v.formValues[0],
                    selection = v.formValues[1]
                if ((!input && !selection) || v.isCanceled) return guiScheme.main(plr)
                const inputUnformatted = input.replace(/§./g, '')
                const target =
                    ( !input ? null : [...world.getPlayers()].find( v => v.name == input || v.name.replace(/§./g, '') == inputUnformatted ) )
                    || ( !selection ? null : pl[selection - 1] )
                if (!target) return guiScheme.pcmd.new(plr, 1)
                if (target == plr) return guiScheme.pcmd.new(plr, 2)
                guiScheme.pcmd.exec(plr, target)
            })
        }
    },

    /** @type { (plr: Player) => void } */
    more: (() => { // more UI
        /** @type { [name: string, fn: (plr: Player) => void][] } */
        const actionList = [
            // [ 'Clear Area'     , plr => plr.runCommand('function UAC/cleararea') ],
            [ 'Clear chat'     , plr => plr.runCommand('function UAC/clearchat') ],
            [ 'Clear lag'      , plr => plr.runCommand('function UAC/lagclear') ],
            [ 'Vanish'         , plr => plr.runCommand('function UAC/vanish') ],
            [ 'Auto Totem'     , plr => plr.runCommand('function UAC/autototem') ],
            [ 'Godmode'        , plr => plr.runCommand('function UAC/tgm') ],
            [ 'Fake Leave'     , plr => plr.runCommand('function UAC/fakeleave') ],
            [ 'Credits'        , plr => plr.runCommand('function UAC/credit') ],
            [ 'Back'           , plr => guiScheme.main(plr) ],
        ]

        const v = new ActionFormData()
            .title('Unity Anticheat')

        for (let [name, f] of actionList) v.button(name)

        return (plr) => void v.show(plr).then(v => {
            if (v.isCanceled) return
            actionList[v.selection][1](plr)
        })
    })(),

    /** @type { (plr: Player) => void } */
    toggle: (plr) => { // module toggle UI
        const v = new ModalFormData()
            .title('Modules')

        /** @type { number[] } */
        const values = []

        const exps = Object.fromEntries( moduleRequires.map(v => [ v, obj(v).players.get(plr) ]) )
        for (let module of moduleDefs) {
            const vl = obj(module.obj[0]).dummies.get(module.name)
            values.push(vl)
            module.toggle.length == 2
                ? v.toggle(`${module.mname} ${ module.require ? ( exps[module.require] ? '§a' : '§c' ) : '§8' }[EXP]`, !!vl)
                : v.dropdown(`${module.mname} ${ module.require ? ( exps[module.require] ? '§a' : '§c' ) : '§8' }[EXP]`, module.toggle, vl)
        }

        v.show(plr).then(v => {
            if (v.isCanceled) return guiScheme.main(plr)
            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) setModule(plr, moduleDefs[i], b)
            }
            guiScheme.main(plr)
        })
    },

    /** @type { (plr: Player) => void } */
    itemban: (plr) => { // itemban UI
        const v = new ModalFormData()
            .title('Item Bans')

        /** @type { number[] } */
        const values = []
        
        for (let itemban of itembanDefs) {
            const vl = obj(itemban.obj).dummies.get(itemban.name)
            values.push(vl)
            v.toggle(itemban.mname, !!vl)
        }

        v.show(plr).then(v => {
            if (v.isCanceled) return guiScheme.main(plr)

            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) {
                    const itemban = itembanDefs[i]
                    let objdata = obj(itemban.obj).dummies
                    objdata.set(itemban.name, b)
                    tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has ${b ? '§aenabled' : '§cdisabled'}§r §eItemBan/${itemban.mname}§r`)
                }
            }

            guiScheme.main(plr)
        })
    },

    /** @type { (plr: Player) => void } */
    oreban: (plr) => { // orealert UI
        const v = new ModalFormData()
            .title('Ore Alerts')
    
        /** @type { number[] } */
        const values = []
        
        for (let oreban of oreBanDefs) {
            const vl = obj(oreban.obj).dummies.get(oreban.name)
            values.push(vl)
            v.toggle(oreban.mname, !!vl)
        }

        v.show(plr).then(v => {
            if (v.isCanceled) return guiScheme.main(plr)

            const newValues = v.formValues.map(v => Number(v))
            for (let i = 0, m = newValues.length, a, b; (a = values[i], b = newValues[i], i < m); i++) {
                if (a != b) {
                    const oreban = oreBanDefs[i]
                    let objdata = obj(oreban.obj).dummies
                    objdata.set(oreban.name, b)
                    tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has ${b ? '§aenabled' : '§cdisabled'}§r §eOreAlert/${oreban.mname}§r`)
                }
            }

            guiScheme.main(plr)
        })
    },

    particles: (() => { // particles
        const v = new ActionFormData()
            .title('Particles')
        
        for (let particle of particleDefs) v.button(particle.mname)
        v.button('Back')

        /** @type { (plr: Player) => void } */
        return (plr) => {
            v.show(plr).then(v => {
                if (v.isCanceled || v.selection == particleDefs.length) return guiScheme.main(plr)

                const particle = particleDefs[v.selection]
                plr.runCommand(`function particle/${particle.fn}`)
            })
        }
    })(),

    kits: (() => { // kits UI
        const v = new ActionFormData()
            .title('Kits')
        
        for (let kit of kitDefs) v.button(kit.mname)
        v.button('Back')
        
        /** @type { (plr: Player) => void } */
        return (plr) => {
            v.show(plr).then(v => {
                if (v.isCanceled || v.selection == kitDefs.length) return guiScheme.main(plr)

                const kit = kitDefs[v.selection]
                plr.runCommand(`structure load "${kit.structure}" ~~~`)
                tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has spawned a kit §e${kit.mname}§r`)
            })
        }
    })(),

    wbchange: (() => { // worldborder change UI
        const v = new ModalFormData()
            .title('World Border')
            .textField('Enter a new world border distance. Leave blank to cancel', 'World border distance (number)')
        
        /** @type { (plr: Player) => void } */
        return (plr) => void v.show(plr).then(v => {
            if (v.isCanceled || !v.formValues[0]) return guiScheme.worldborder(plr)

            let newValue = Number(v.formValues[0])
            if (isNaN(newValue)) return guiScheme.worldborder(plr)

            obj('Border_Coord_X').dummies.set('BDXdummy', newValue)
            obj('Border_Coord_Z').dummies.set('BDXdummy', newValue)
            tellrawStaff(`§¶§cUAC ► §bPlayer §d${plr.name}§b has set the world border size to §a${newValue}§b/§a${newValue}§r`)

            guiScheme.worldborder(plr)
        })
    })(),

    /** @type { (plr: Player) => void } */
    worldborder: (plr) => { // worldborder UI
        const status = obj('WBM').dummies.get('wbmtoggledummy'),
            currentX = obj('Border_Coord_X').dummies.get('BDXdummy'),
            currentZ = obj('Border_Coord_Z').dummies.get('BDXdummy')
        
        let v = new ActionFormData()
            .title('World Border')
            .body([
                `Status: ${status ? '§aENABLED' : '§cDISABLED'}§r`,
                `Current distance: §a${currentX}§r / §a${currentZ}§r`
            ].join('\n'))
            .button('Change distance')
            .button('Change toggle')
            .button('Back')
        
        v.show(plr).then(v => {
            if (v.isCanceled || v.selection == moduleDefs.length) return guiScheme.main(plr)
            switch (v.selection) {
                case 0: return guiScheme.wbchange(plr)
                case 1: {
                    /** @type { typeof moduleDefs[number] } */
                    const module = {
                        mname: 'World Border',
                        obj: ['WBM', 'wbmtoggle'],
                        name: 'wbmtoggledummy',
                        toggle: ['§cOFF', '§aON'],
                        require: 'has_xx'
                    }
                    setModule(plr, module)

                    return guiScheme.worldborder(plr)
                }
                case 2: return guiScheme.main(plr)
            }
        })
    }
}

const registerInformation = {
    cancelMessage: true,
    name: 'gui',
    private: 'true',
    description: 'GUI command',
    usage: '[ gui ]',
    example: [
        'gui'
    ]
};

/** @type { Map<Player, [x:number,y:number,z:number]> } */
const waitMove = new Map()

Server.command.register(registerInformation, (chatmsg, args) => {
    const { sender } = chatmsg, {location: {x, y, z}} = sender
    if (!sender.hasTag('staffstatus')) return sender.tellraw(`§¶§cUAC ► §c§lError 4: Only Staff can use this command`)
    sender.tellraw(`§aMove to show the UI.`)
    waitMove.set(chatmsg.sender, [x, y, z])
})

world.events.tick.subscribe(() => {
    for (let [plr, [x, y, z]] of waitMove) {
        try {
            let { x: xc, y: yc, z: zc } = plr.location
            if (x != xc || y != yc || z != zc) {
                waitMove.delete(plr)
                guiScheme.main(plr)
            }
        } catch {
            waitMove.delete(plr)
        }
    }
})

