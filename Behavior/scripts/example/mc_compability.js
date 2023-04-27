import { BeforeChatEvent, BeforeDataDrivenEntityTriggerEvent, BeforeExplosionEvent, Block, BlockPistonComponent, ChatEvent, DefinitionModifier, Entity, EntityAgeableComponent, EntityBreathableComponent, EntityHealableComponent, EntityRideableComponent, EntityTameableComponent, ExplosionEvent, FeedItem, ItemDurabilityComponent, ItemStack, ItemStartUseOnEvent, ItemStopUseOnEvent, ItemUseOnEvent, NavigationResult, Player, ProjectileHitEvent, World } from "@minecraft/server";
const idDesc = Object.getOwnPropertyDescriptor(Entity.prototype, 'id');
Object.defineProperty(Entity.prototype, 'uid', {
    configurable: true,
    get() { return +idDesc.get?.call(this); }
});
Object.defineProperty(Entity.prototype, 'uidRaw', idDesc);
const renameProperties = [
    [
        Entity, [
            ['rotation', ['getRotation']],
            ['velocity', ['getVelocity']],
            ['viewDirection', ['getViewDirection']],
            //['uid', 'id'],
            ['id', 'typeId']
        ]
    ], [
        Player, [
            ['tell', 'sendMessage'],
        ]
    ], [
        Block, [
            ['id', 'typeId']
        ]
    ], [
        ItemStack, [
            ['id', 'typeId']
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
        BlockPistonComponent, [
            ['attachedBlocks', ['getAttachedBlocks']]
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
        NavigationResult, [
            ['path', ['getPath']],
        ]
    ], [
        ItemUseOnEvent, [
            ['blockLocation', ['getBlockLocation']],
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
