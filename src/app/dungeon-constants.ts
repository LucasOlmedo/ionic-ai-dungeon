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
        calc: val => val * 0.05,
        atr: 'life',
        value: 5,
        operator: '-',
        title: 'Envenenamento',
        location: 'Pântano venenoso',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'burn',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.05,
        atr: 'life',
        value: 5,
        operator: '-',
        title: 'Queimadura',
        location: 'Salão solar',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'atk',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.20,
        atr: 'atk',
        value: 20,
        operator: '-',
        title: 'Redução de Ataque',
        location: 'Túmulo das armas',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'def',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.20,
        atr: 'def',
        value: 20,
        operator: '-',
        title: 'Redução de Defesa',
        location: 'Túmulo dos soldados',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'vel',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.20,
        atr: 'vel',
        value: 20,
        operator: '-',
        title: 'Redução de Velocidade',
        location: 'Areia movediça',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
];

export const BLESS_TYPES = [
    {
        icon: 'heal',
        turns: () => 0,
        calc: val => val * 0.30,
        atr: 'life',
        value: 30,
        operator: '+',
        title: 'Cura',
        location: 'Estatueta de Atena',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'mana',
        turns: () => 0,
        calc: val => val * 0.30,
        atr: 'mana',
        value: 30,
        operator: '+',
        title: 'Mana',
        location: 'Altar sagrado',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'atk',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.20,
        atr: 'atk',
        value: 20,
        operator: '+',
        title: 'Aumento de Ataque',
        location: 'Caverna escura',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'def',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.20,
        atr: 'def',
        value: 20,
        operator: '+',
        title: 'Aumento de Defesa',
        location: 'Beco de concreto',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
    {
        icon: 'vel',
        turns: () => Math.ceil(Math.random() * 4),
        calc: val => val * 0.20,
        atr: 'vel',
        value: 20,
        operator: '+',
        title: 'Aumento de Velocidade',
        location: 'Corredor das faíscas',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`
    },
];

export const TRAPS = [
    {
        img: '../assets/images/trap/wolf-trap.png',
        value: 15,
        location: 'Armadilha de lobo',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
    {
        img: '../assets/images/trap/wine.png',
        value: 10,
        location: 'Tentáculo de erva-espinho',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
    {
        img: '../assets/images/trap/earthquake.png',
        value: 15,
        location: 'Falha geológica',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
    {
        img: '../assets/images/trap/spike.png',
        value: 20,
        location: 'Corredor pontiagudo',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
    {
        img: '../assets/images/trap/fireball.png',
        value: 15,
        location: 'Rocha incandescente',
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
    },
];
