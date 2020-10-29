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
        title: 'Envenenamento',
        location: 'Pântano venenoso',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'burn',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.03,
        attr: 'life',
        value: 3,
        operator: '-',
        title: 'Queimadura',
        location: 'Salão solar',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'atk',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'atk',
        value: 15,
        operator: '-',
        title: 'Ataque e Magia',
        location: 'Túmulo das armas',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'def',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'def',
        value: 15,
        operator: '-',
        title: 'Defesa e Proteção',
        location: 'Túmulo dos soldados',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'vel',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'vel',
        value: 15,
        operator: '-',
        title: 'Velocidade',
        location: 'Areia movediça',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
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
        title: 'Cura',
        location: 'Estatueta de Atena',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'mana',
        turns: () => 0,
        calc: val => val * 0.20,
        attr: 'mana',
        value: 20,
        operator: '+',
        title: 'Mana',
        location: 'Altar sagrado',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'atk',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'atk',
        value: 15,
        operator: '+',
        title: 'Ataque e Magia',
        location: 'Caverna escura',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'def',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'def',
        value: 15,
        operator: '+',
        title: 'Defesa e Proteção',
        location: 'Beco de concreto',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'vel',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.15,
        attr: 'vel',
        value: 15,
        operator: '+',
        title: 'Velocidade',
        location: 'Corredor das faíscas',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
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
