export const START_ROOM = [
    {
        img: '../assets/images/room.jpg',
        location: 'Quarto desconhecido',
        title: 'Madison, WI',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        img: '../assets/images/cave.jpg',
        location: 'Caverna misteriosa',
        title: 'Nibirus, WI',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        img: '../assets/images/woods.jpg',
        location: 'Clareira na floresta',
        title: 'Valencia, WI',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        img: '../assets/images/prision.jpg',
        location: 'Prisão abandonada',
        title: 'Krashina, WI',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        img: '../assets/images/tavern.jpg',
        location: 'Taverna de Swabiuz',
        title: 'Swabiuz, WI',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Enim quas, explicabo accusamus in aut a molestias
        ipsa sit magni voluptatibus ex necessitatibus facere laborum dolorem!
        Possimus error minus quidem repudiandae.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
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
        location: 'Armadilha de lobo',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
    {
        img: '../assets/images/trap/wine.png',
        value: hp => ~~(hp * 0.08),
        location: 'Tentáculo de erva-espinho',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
    {
        img: '../assets/images/trap/earthquake.png',
        value: hp => ~~(hp * 0.13),
        location: 'Falha geológica',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
    {
        img: '../assets/images/trap/spike.png',
        value: hp => ~~(hp * 0.12),
        location: 'Corredor pontiagudo',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
    {
        img: '../assets/images/trap/fireball.png',
        value: hp => ~~(hp * 0.15),
        location: 'Rocha incandescente',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
];

export const BOSS_SPEAK = [
    {
        floor: 10,
        message: '...O...O...Que...Você ainda...está...fazendo...aqui?',
    },
];
