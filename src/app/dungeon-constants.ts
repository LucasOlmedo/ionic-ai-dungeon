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
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.03,
        attr: 'life',
        value: 3,
        operator: '-',
        title: 'curse.venom.title',
        location: 'curse.venom.location',
        description: 'curse.venom.desc'
    },
    {
        icon: 'burn',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.03,
        attr: 'life',
        value: 3,
        operator: '-',
        title: 'curse.burn.title',
        location: 'curse.burn.location',
        description: 'curse.burn.desc'
    },
    {
        icon: 'atk',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'atk',
        value: 15,
        operator: '-',
        title: 'curse.atk.title',
        location: 'curse.atk.location',
        description: 'curse.atk.desc'
    },
    {
        icon: 'def',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'def',
        value: 15,
        operator: '-',
        title: 'curse.def.title',
        location: 'curse.def.location',
        description: 'curse.def.desc'
    },
    {
        icon: 'vel',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'vel',
        value: 15,
        operator: '-',
        title: 'curse.vel.title',
        location: 'curse.vel.location',
        description: 'curse.vel.desc'
    },
];

export const BLESS_TYPES = [
    {
        icon: 'heal',
        turns: () => 0,
        calc: val => val * 0.20,
        attr: 'life',
        value: 20,
        operator: '+',
        title: 'bless.heal.title',
        location: 'bless.heal.location',
        description: 'bless.heal.desc'
    },
    {
        icon: 'mana',
        turns: () => 0,
        calc: val => val * 0.20,
        attr: 'mana',
        value: 20,
        operator: '+',
        title: 'bless.mana.title',
        location: 'bless.mana.location',
        description: 'bless.mana.desc'
    },
    {
        icon: 'atk',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'atk',
        value: 15,
        operator: '+',
        title: 'bless.atk.title',
        location: 'bless.atk.location',
        description: 'bless.atk.desc'
    },
    {
        icon: 'def',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'def',
        value: 15,
        operator: '+',
        title: 'bless.def.title',
        location: 'bless.def.location',
        description: 'bless.def.desc'
    },
    {
        icon: 'vel',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'vel',
        value: 15,
        operator: '+',
        title: 'bless.vel.title',
        location: 'bless.vel.location',
        description: 'bless.vel.desc'
    },
];

export const TRAPS = [
    {
        img: '../assets/images/trap/wolf-trap.png',
        value: hp => ~~(hp * 0.10),
        location: 'trap.wolf-trap.location',
        description: 'trap.wolf-trap.desc',
    },
    {
        img: '../assets/images/trap/wine.png',
        value: hp => ~~(hp * 0.08),
        location: 'trap.wine.location',
        description: 'trap.wine.desc',
    },
    {
        img: '../assets/images/trap/earthquake.png',
        value: hp => ~~(hp * 0.13),
        location: 'trap.earthquake.location',
        description: 'trap.earthquake.desc',
    },
    {
        img: '../assets/images/trap/spike.png',
        value: hp => ~~(hp * 0.12),
        location: 'trap.spike.location',
        description: 'trap.spike.desc',
    },
    {
        img: '../assets/images/trap/fireball.png',
        value: hp => ~~(hp * 0.15),
        location: 'trap.fireball.location',
        description: 'trap.fireball.desc',
    },
];

export const BOSS_SPEAK = [
    {
        floor: 10,
        message: 'final-boss.10.speak',
    },
];
