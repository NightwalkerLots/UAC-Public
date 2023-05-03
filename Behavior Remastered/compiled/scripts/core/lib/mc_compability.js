import { BeforeChatEvent, BeforeDataDrivenEntityTriggerEvent, BeforeExplosionEvent, BeforeItemUseOnEvent, Block, BlockPistonComponent, BlockWaterContainerComponent, ChatEvent, DefinitionModifier, Entity, EntityAgeableComponent, EntityBreathableComponent, EntityHealableComponent, EntityRideableComponent, EntityTameableComponent, ExplosionEvent, FeedItem, ItemDurabilityComponent, ItemStack, ItemStartUseOnEvent, ItemStopUseOnEvent, ItemUseOnEvent, NavigationResult, Player, ProjectileHitEvent, System, World } from "@minecraft/server";
import { SimulatedPlayer } from "@minecraft/server-gametest";
for (const obj of [Entity, Player]) {
    const { get: OUidGet } = Object.getOwnPropertyDescriptor(obj.prototype, 'id') ?? {};
    Object.defineProperty(obj.prototype, 'uid', {
        configurable: true,
        get() { return +OUidGet?.call(this); }
    });
}
Object.defineProperty(Entity, Symbol.hasInstance, { value(v) { return [Entity.prototype, Player.prototype, SimulatedPlayer.prototype].includes(Object.getPrototypeOf(v ?? {})); } });
Object.defineProperty(Player, Symbol.hasInstance, { value(v) { return [Player.prototype, SimulatedPlayer.prototype].includes(Object.getPrototypeOf(v ?? {})); } }); // unnecessary in 1.19.70
const renameProperties = [
    [
        Entity, [
            ['rotation', ['getRotation']],
            ['velocity', ['getVelocity']],
            ['viewDirection', ['getViewDirection']],
            //['uid', 'id'],
            ['id', 'typeId'],
            ['headLocation', ['getHeadLocation']],
        ]
    ], [
        Player, [
            ['tell', 'sendMessage'],
            ['rotation', ['getRotation']],
            ['velocity', ['getVelocity']],
            ['viewDirection', ['getViewDirection']],
            //['uid', 'id'],
            ['id', 'typeId'],
            ['headLocation', ['getHeadLocation']],
        ]
    ], [
        SimulatedPlayer, []
    ], [
        Block, [
            ['id', 'typeId']
        ]
    ], [
        ItemStack, [
            ['id', 'typeId']
        ]
    ], [
        System, [
            ['runSchedule', 'runInterval']
        ]
    ], [
        World, [
            ['say', 'sendMessage']
        ]
    ], [
        BeforeChatEvent, [
            ['targets', ['getTargets', 'setTargets']]
        ]
    ], [
        BeforeDataDrivenEntityTriggerEvent, [
            ['modifiers', ['getModifiers', 'setModifiers']]
        ]
    ], [
        ChatEvent, [
            ['targets', ['getTargets']]
        ]
    ], [
        BeforeDataDrivenEntityTriggerEvent, [
            ['modifiers', ['getModifiers']]
        ]
    ], [
        DefinitionModifier, [
            ['componentGroupsToAdd', ['getComponentGroupsToAdd', 'setComponentGroupsToAdd']],
            ['componentGroupsToRemove', ['getComponentGroupsToRemove', 'setComponentGroupsToRemove']],
            ['triggers', ['getTriggers', 'setTriggers']]
        ]
    ], [
        EntityAgeableComponent, [
            ['dropItems', ['getDropItems']],
            ['feedItems', ['getFeedItems']],
        ]
    ], [
        EntityBreathableComponent, [
            ['breatheBlocks', ['getBreatheBlocks']],
            ['nonBreatheBlocks', ['getNonBreatheBlocks']],
        ]
    ], [
        EntityHealableComponent, [
            ['items', ['getFeedItems']]
        ]
    ], [
        EntityRideableComponent, [
            ['familyTypes', ['getFamilyTypes']],
            ['seats', ['getSeats']],
        ]
    ], [
        EntityTameableComponent, [
            ['tameItems', ['getTameItems']],
        ]
    ], [
        FeedItem, [
            ['effects', ['getEffects']]
        ]
    ], [
        ItemDurabilityComponent, [
            ['damageRange', ['getDamageRange']]
        ]
    ], [
        ProjectileHitEvent, [
            ['blockHit', ['getBlockHit']],
            ['entityHit', ['getEntityHit']]
        ]
    ], [
        BeforeExplosionEvent, [
            ['impactedBlocks', ['getImpactedBlocks', 'setImpactedBlocks']]
        ]
    ], [
        ExplosionEvent, [
            ['impactedBlocks', ['getImpactedBlocks']]
        ]
    ], [
        BeforeItemUseOnEvent, [
            ['blockLocation', ['getBlockLocation']]
        ]
    ], [
        BlockPistonComponent, [
            ['attachedBlocks', ['getAttachedBlocks']]
        ]
    ], [
        BlockWaterContainerComponent, [
            ['customColor', ['getCustomColor', 'setCustomColor']]
        ]
    ], [
        ItemStartUseOnEvent, [
            ['blockLocation', ['getBlockLocation']],
            ['buildBlockLocation', ['getBuildBlockLocation']]
        ]
    ], [
        ItemStopUseOnEvent, [
            ['blockLocation', ['getBlockLocation']],
        ]
    ], [
        ItemUseOnEvent, [
            ['blockLocation', ['getBlockLocation']],
        ]
    ], [
        NavigationResult, [
            ['path', ['getPath']],
        ]
    ]
];
for (const [obj, list] of renameProperties) {
    const cp = Object.getOwnPropertyDescriptors(obj.prototype);
    for (const [k, d] of list) {
        if (typeof d === 'string') {
            const o = cp[d] || cp[k];
            if (o)
                Object.defineProperty(obj.prototype, k, o);
        }
        else {
            const g = cp[d[0]] || cp[k], s = d[1] ? cp[d[1]] : undefined;
            const gv = g ? g.value ?? g.get : undefined, sv = s ? s.value ?? s.set : undefined;
            const desc = {
                get() { return gv?.call(this); },
                //set(v) { return s?.set?.call(this, v) },
                enumerable: false,
                configurable: true
            };
            if (s)
                desc.set = function (v) { return sv?.call(this, v); };
            Object.defineProperty(obj.prototype, k, desc);
        }
    }
}
if (Player.prototype.applyKnockback && !Player.prototype.setVelocity)
    Player.prototype.setVelocity = function ({ x, y, z }) { Player.prototype.applyKnockback.call(this, x, z, 1, y); };
