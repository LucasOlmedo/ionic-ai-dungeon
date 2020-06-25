export const EQUIPS = [

    // HELMET
    {
        type: 'equip',
        equiped: false,
        equip: 'helmet',
        img: '../assets/images/equip/helmet/silver-helm.png',
        name: 'Elmo de prata',
        extra: [
            {
                attr: 'life',
                value: 17,
            },
        ],
    },

    // SHIELD
    {
        type: 'equip',
        equiped: false,
        equip: 'shield',
        img: '../assets/images/equip/shield/blue-shield.png',
        name: 'Escudo azul',
        extra: [
            {
                attr: 'def',
                value: 10,
            },
        ],
    },

    // ARMOR
    {
        type: 'equip',
        equiped: false,
        equip: 'armor',
        img: '../assets/images/equip/armor/scale-armor.png',
        name: 'Armadura de escamas',
        extra: [
            {
                attr: 'life',
                value: 15,
            },
            {
                attr: 'def',
                value: 8,
            },
            {
                attr: 'mana',
                value: 12,
            },
        ],
    },

    // SWORD
    {
        type: 'equip',
        equiped: false,
        equip: 'sword',
        img: '../assets/images/equip/sword/gladius.png',
        name: 'Gladius',
        extra: [
            {
                attr: 'atk',
                value: 12,
            },
            {
                attr: 'crit',
                value: 3,
            },
        ],
    },

    // RING
    {
        type: 'equip',
        equiped: false,
        equip: 'ring',
        img: '../assets/images/equip/ring/snake-ring.png',
        name: 'Anel de Ouroboros',
        extra: [
            {
                attr: 'vel',
                value: 8,
            },
            {
                attr: 'eva',
                value: 1,
            },
        ],
    },

    // BOOTS
    {
        id: null,
        type: 'equip',
        equiped: false,
        equip: 'boots',
        img: '../assets/images/equip/boots/roman-boots.png',
        name: 'Bota pesada',
        extra: [
            {
                attr: 'life',
                value: 11,
            },
            {
                attr: 'def',
                value: 5,
            },
        ],
    },

    // NECKLACE
    {
        id: null,
        type: 'equip',
        equiped: false,
        equip: 'necklace',
        img: '../assets/images/equip/necklace/emeral-necklace.png',
        name: 'Colar esmeralda',
        extra: [
            {
                attr: 'magic',
                value: 5,
            },
            {
                attr: 'prot',
                value: 10,
            },
        ],
    },

    // LOOT
    {
        id: 1,
        type: 'potion',
        equiped: false,
        img: '../assets/images/equip/loot/life-potion.png',
        name: 'Poção de cura',
        count: 1,
        attr: 'life',
        value: 15,
    },
    {
        id: 2,
        type: 'potion',
        equiped: false,
        img: '../assets/images/equip/loot/mana-potion.png',
        name: 'Poção de mana',
        count: 1,
        attr: 'mana',
        value: 15,
    }
];
