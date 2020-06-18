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
    inventory = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
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
    skills = [
        {
            img: '../assets/images/skill/basic-atk.png',
            color: 'skillGray',
            active: true,
            damage: 40,
            cost: 0,
        },
        {
            img: '../assets/images/skill/strike-shot.png',
            color: 'skillEmerald',
            active: true,
            damage: 50,
            cost: 15,
        },
        {
            img: '../assets/images/skill/shield-reflect.png',
            color: 'skillYellow',
            active: true,
            damage: 0,
            cost: 20,
        },
        {
            img: '../assets/images/skill/slash-claws.png',
            color: 'skillDarkred',
            active: true,
            damage: 65,
            cost: 25,
        },
    ];
    equip = {
        helmet: null,
        shield: null,
        armor: null,
        sword: null,
        ring: null,
        boots: null,
        necklace: null,
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
        this.current.life += ~~(this.base.life * 0.25);
        if (this.current.life >= this.base.life) {
            this.current.life = ~~((this.base.life + ((this.vitality || 1) *
                (9 + (this.level * 0.5)))));
        }
        this.base.life = ~~((this.base.life + ((this.vitality || 1) *
            (9 + (this.level * 0.5)))));
    }

    updateMana() {
        this.current.mana += ~~(this.base.mana * 0.25);
        if (this.current.mana >= this.base.mana) {
            this.current.mana = ~~((this.base.mana + ((this.intelligence || 1) *
                (4 + (this.level * 0.3)))));
        }
        this.base.mana = ~~((this.base.mana + ((this.intelligence || 1) *
            (4 + (this.level * 0.3)))));
    }

    updateVitality() {
        // atk
        this.base.atk = ~~((8 + ((this.vitality || 1) * (this.level / 0.7))));
        this.current.atk = ~~((8 + ((this.vitality || 1) * (this.level / 0.7))));
        // def
        this.base.def = ~~((5 + ((this.vitality || 1) * (this.level / 0.9))));
        this.current.def = ~~((5 + ((this.vitality || 1) * (this.level / 0.9))));
    }

    updateIntelligence() {
        // magic
        this.base.magic = ~~((4 + ((this.intelligence || 1) * (this.level / 0.8))));
        this.current.magic = ~~((4 + ((this.intelligence || 1) * (this.level / 0.8))));
        // prot
        this.base.prot = ~~((2 + ((this.intelligence || 1) * (this.level / 0.9))));
        this.current.prot = ~~((2 + ((this.intelligence || 1) * (this.level / 0.9))));
    }

    updateAgility() {
        // vel
        this.base.vel = ~~((this.base.vel + ((this.agility || 1) *
            (2 + (this.level / 0.6)))));
        this.current.vel = ~~((this.current.vel + ((this.agility || 1) *
            (2 + (this.level / 0.6)))));
        // crit
        this.base.crit = ~~(1 + ((this.agility || 1) * (this.level * 0.3)));
        this.current.crit = ~~(1 + ((this.agility || 1) * (this.level * 0.3)));
        // eva
        this.base.eva = ~~(1 + ((this.agility || 1) * (this.level * 0.2)));
        this.current.eva = ~~(1 + ((this.agility || 1) * (this.level * 0.2)));
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

    getCurrentNextLvl() {
        return ~~this.currentNextLvl;
    }

    getNextLvl() {
        return ~~this.nextLvl;
    }
}
