export const START_ROOM = [
    {
        img: '../assets/images/room.jpg',
        location: 'start-room.room.location',
        title: 'start-room.room.title',
        description: 'start-room.room.desc'
    },
    {
        img: '../assets/images/cave.jpg',
        location: 'start-room.cave.location',
        title: 'start-room.cave.title',
        description: 'start-room.cave.desc'
    },
    {
        img: '../assets/images/woods.jpg',
        location: 'start-room.woods.location',
        title: 'start-room.woods.title',
        description: 'start-room.woods.desc'
    },
    {
        img: '../assets/images/prision.jpg',
        location: 'start-room.prision.location',
        title: 'start-room.prision.title',
        description: 'start-room.prision.desc'
    },
    {
        img: '../assets/images/tavern.jpg',
        location: 'start-room.tavern.location',
        title: 'start-room.tavern.title',
        description: 'start-room.tavern.desc'
    },
];

export const CURSE_TYPES = [
    {
        icon: 'venom',
        turns: 4,
        calc: 0.04,
        attr: 'life',
        value: 4,
        operator: '-',
        title: 'curse.venom.title',
        location: 'curse.venom.location',
        description: 'curse.venom.desc',
        sound: 'curseVenon',
    },
    {
        icon: 'burn',
        turns: 4,
        calc: 0.04,
        attr: 'life',
        value: 4,
        operator: '-',
        title: 'curse.burn.title',
        location: 'curse.burn.location',
        description: 'curse.burn.desc',
        sound: 'curseBurn',
    },
    {
        icon: 'atk',
        turns: 4,
        calc: 0.25,
        attr: 'atk',
        value: 25,
        operator: '-',
        title: 'curse.atk.title',
        location: 'curse.atk.location',
        description: 'curse.atk.desc',
        sound: 'curseAtk',
    },
    {
        icon: 'def',
        turns: 4,
        calc: 0.25,
        attr: 'def',
        value: 25,
        operator: '-',
        title: 'curse.def.title',
        location: 'curse.def.location',
        description: 'curse.def.desc',
        sound: 'curseDef',
    },
    {
        icon: 'vel',
        turns: 4,
        calc: 0.20,
        attr: 'vel',
        value: 20,
        operator: '-',
        title: 'curse.vel.title',
        location: 'curse.vel.location',
        description: 'curse.vel.desc',
        sound: 'curseVel',
    },
];

export const BLESS_TYPES = [
    {
        icon: 'heal',
        turns: 0,
        calc: 0.20,
        attr: 'life',
        value: 20,
        operator: '+',
        title: 'bless.heal.title',
        location: 'bless.heal.location',
        description: 'bless.heal.desc',
        sound: 'blessHeal',
    },
    {
        icon: 'mana',
        turns: 0,
        calc: 0.20,
        attr: 'mana',
        value: 20,
        operator: '+',
        title: 'bless.mana.title',
        location: 'bless.mana.location',
        description: 'bless.mana.desc',
        sound: 'blessMana',
    },
    {
        icon: 'atk',
        turns: 4,
        calc: 0.15,
        attr: 'atk',
        value: 15,
        operator: '+',
        title: 'bless.atk.title',
        location: 'bless.atk.location',
        description: 'bless.atk.desc',
        sound: 'blessAtk',
    },
    {
        icon: 'def',
        turns: 4,
        calc: 0.15,
        attr: 'def',
        value: 15,
        operator: '+',
        title: 'bless.def.title',
        location: 'bless.def.location',
        description: 'bless.def.desc',
        sound: 'blessDef',
    },
    {
        icon: 'vel',
        turns: 4,
        calc: 0.15,
        attr: 'vel',
        value: 15,
        operator: '+',
        title: 'bless.vel.title',
        location: 'bless.vel.location',
        description: 'bless.vel.desc',
        sound: 'blessVel',
    },
];

export const TRAPS = [
    {
        img: '../assets/images/trap/wolf-trap.png',
        value: 0.10,
        location: 'trap.wolf-trap.location',
        description: 'trap.wolf-trap.desc',
        sound: 'trapWolf',
    },
    {
        img: '../assets/images/trap/wine.png',
        value: 0.08,
        location: 'trap.wine.location',
        description: 'trap.wine.desc',
        sound: 'trapWine',
    },
    {
        img: '../assets/images/trap/earthquake.png',
        value: 0.13,
        location: 'trap.earthquake.location',
        description: 'trap.earthquake.desc',
        sound: 'trapEarth',
    },
    {
        img: '../assets/images/trap/spike.png',
        value: 0.12,
        location: 'trap.spike.location',
        description: 'trap.spike.desc',
        sound: 'trapSpike',
    },
    {
        img: '../assets/images/trap/fireball.png',
        value: 0.15,
        location: 'trap.fireball.location',
        description: 'trap.fireball.desc',
        sound: 'trapFire',
    },
];

export const BOSS_SPEAK = [
    {
        floor: 10,
        message: 'final-boss.10.speak',
    },
    {
        floor: 20,
        message: 'final-boss.20.speak',
    },
    {
        floor: 30,
        message: 'final-boss.30.speak',
    },
    {
        floor: 40,
        message: 'final-boss.40.speak',
    },
    {
        floor: 50,
        message: 'final-boss.50.speak',
    },
    {
        floor: 60,
        message: 'final-boss.60.speak',
    },
    {
        floor: 70,
        message: 'final-boss.70.speak',
    },
    {
        floor: 80,
        message: 'final-boss.80.speak',
    },
    {
        floor: 90,
        message: 'final-boss.90.speak',
    },
    {
        floor: 100,
        message: 'final-boss.100.speak',
    },
];
