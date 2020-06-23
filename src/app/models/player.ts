export class Player {
    name: string;
    level: number = 1;
    exp: number = 0;
    expPercent = 0;
    nextLvl: number = 100;
    currentNextLvl: number = 0;
    points: number = 0;
    vitality: number = 0;
    intelligence: number = 0;
    agility: number = 0;
    gold = 0;
    floorIndex: number = 1;
    roomIndex: number = 1;
    killCount: number = 0;
    inventory = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    currentLife = 0;
    baseLife = 0;
    currentMana = 0;
    baseMana = 0;
    base = {
        life: 100,
        atk: 10,
        def: 10,
        mana: 100,
        magic: 10,
        prot: 10,
        vel: 10,
        crit: 1,
        eva: 1,
    };
    current = {
        life: 100,
        atk: 10,
        def: 10,
        mana: 100,
        magic: 10,
        prot: 10,
        vel: 10,
        crit: 1,
        eva: 1,
    };
    equipAttr = {
        life: 0,
        atk: 0,
        def: 0,
        mana: 0,
        magic: 0,
        prot: 0,
        vel: 0,
        crit: 0,
        eva: 0,
    };
    skills = [
        {
            img: '../assets/images/skill/basic-atk.png',
            color: 'skillGray',
            active: true,
            val: 55,
            cost: 0,
            type: 'atk',
            attr: 'atk',
        },
        {},
        {},
        {},
    ];
    equip = {
        helmet: {
            img: '../assets/images/equip/helmet/silver-helm.png',
            name: 'Elmo de prata',
            extra: [
                // {
                //     attr: 'life',
                //     value: 7,
                // },
            ],
        },
        shield: {
            img: '../assets/images/equip/shield/blue-shield.png',
            name: 'Escudo azul',
            extra: [
                {
                    attr: 'def',
                    value: 6,
                },
            ],
        },
        armor: {
            img: '../assets/images/equip/armor/scale-armor.png',
            name: 'Armadura de escamas',
            extra: [
                // {
                //     attr: 'life',
                //     value: 4,
                // },
                {
                    attr: 'mana',
                    value: 11,
                },
            ],
        },
        sword: {
            img: '../assets/images/equip/sword/gladius.png',
            name: 'Gladius',
            extra: [
                {
                    attr: 'atk',
                    value: 7,
                },
                {
                    attr: 'crit',
                    value: 3,
                },
            ],
        },
        ring: {
            img: '../assets/images/equip/ring/snake-ring.png',
            name: 'Anel de Ouroboros',
            extra: [
                {
                    attr: 'vel',
                    value: 7,
                },
            ],
        },
        boots: {
            img: '../assets/images/equip/boots/roman-boots.png',
            name: 'Bota pesada',
            extra: [
                {
                    attr: 'life',
                    value: 12,
                },
            ],
        },
        necklace: {
            img: '../assets/images/equip/necklace/emeral-necklace.png',
            name: 'Colar esmeralda',
            extra: [
                {
                    attr: 'prot',
                    value: 7,
                },
            ],
        },
    };
    conditions = [];

    updateExp(exp) {
        this.exp = exp;
        this.currentNextLvl += exp;
        this.expPercent = this.currentNextLvl / this.nextLvl;
        if (this.currentNextLvl >= this.nextLvl) {
            this.level++;
            this.points++;
            this.currentNextLvl -= this.nextLvl;
            this.nextLvl = (this.nextLvl / 0.8);
            this.expPercent = this.currentNextLvl / this.nextLvl;
            this.calcLevel();
        }
    }

    calcLevel() {
        // life
        this.updateLife();
        // mana
        this.updateMana();
        // atk | def
        this.updateVitality();
        // magic | prot
        this.updateIntelligence();
        // vel | crit | eva
        this.updateAgility();
    }

    calcEquipAttr() {
        for (let eq in this.equip) {
            if (this.equip[eq] != null) {
                for (let ex of this.equip[eq].extra) {
                    this.equipAttr[ex.attr] += ex.value;
                }
            }
        }
    }

    updateAttributes(type) {
        switch (type) {
            case 'vitality':
                this.updateLife();
                this.updateVitality();
                break;
            case 'intelligence':
                this.updateMana();
                this.updateIntelligence();
                break;
            case 'agility':
                this.updateAgility();
                break;
        }
    }

    updateLife() {
        this.current.life += ~~(this.base.life * 0.20);
        if (this.current.life >= this.base.life) {
            this.current.life = ~~((this.base.life + ((this.vitality || 1) *
                (2.75 + (this.level * 0.1)))));
        }
        this.base.life = ~~((this.base.life + ((this.vitality || 1) *
            (2.75 + (this.level * 0.1)))));
    }

    updateMana() {
        this.current.mana += ~~(this.base.mana * 0.20);
        if (this.current.mana >= this.base.mana) {
            this.current.mana = ~~((this.base.mana + ((this.intelligence || 1) *
                (2.5 + (this.level * 0.1)))));
        }
        this.base.mana = ~~((this.base.mana + ((this.intelligence || 1) *
            (2.5 + (this.level * 0.1)))));
    }

    updateVitality() {
        // atk
        this.base.atk = ~~((7 + ((this.vitality || 1) * (this.level / 0.6))));
        this.current.atk = ~~((7 + ((this.vitality || 1) * (this.level / 0.6))));
        // def
        this.base.def = ~~((7 + ((this.vitality || 1) * (this.level / 0.7))));
        this.current.def = ~~((7 + ((this.vitality || 1) * (this.level / 0.7))));
    }

    updateIntelligence() {
        // magic
        this.base.magic = ~~((5 + ((this.intelligence || 1) * (this.level / 0.7))));
        this.current.magic = ~~((5 + ((this.intelligence || 1) * (this.level / 0.7))));
        // prot
        this.base.prot = ~~((4 + ((this.intelligence || 1) * (this.level / 0.7))));
        this.current.prot = ~~((4 + ((this.intelligence || 1) * (this.level / 0.7))));
    }

    updateAgility() {
        // vel
        this.base.vel = ~~((this.base.vel + ((this.agility || 1) * (this.level / 0.9))));
        this.current.vel = ~~((this.current.vel + ((this.agility || 1) * (this.level / 0.9))));
        // crit
        this.base.crit = Math.ceil(1.35 + ((this.agility || 1) * (this.level * 0.1)));
        this.current.crit = Math.ceil(1.35 + ((this.agility || 1) * (this.level * 0.1)));
        // eva
        this.base.eva = ~~(1 + ((this.agility || 1) * (this.level * 0.1)));
        this.current.eva = ~~(1 + ((this.agility || 1) * (this.level * 0.1)));
    }

    initCurrent() {
        this.current.life = this.base.life;
        this.current.atk = this.base.atk;
        this.current.def = this.base.def;
        this.current.mana = this.base.mana;
        this.current.magic = this.base.magic;
        this.current.prot = this.base.prot;
        this.current.vel = this.base.vel;
        this.current.crit = this.base.crit;
        this.current.eva = this.base.eva;
    }

    initEquipAttr() {
        this.currentLife = this.current.life + this.equipAttr.life;
        this.baseLife = this.base.life + this.equipAttr.life;
        this.currentMana = this.current.mana + this.equipAttr.mana;
        this.baseMana = this.base.mana + this.equipAttr.mana;
    }

    getCurrentNextLvl() {
        return ~~this.currentNextLvl;
    }

    getNextLvl() {
        return ~~this.nextLvl;
    }
}
