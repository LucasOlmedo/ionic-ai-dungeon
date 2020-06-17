export class Player {
    name: string;
    level: number = 1;
    exp: number = 0;
    expPercent = 0;
    nextLvl: number = 100;
    currentNextLvl: number = 0;
    vitality: number = 0;
    intelligence: number = 0;
    agility: number = 0;
    gold = 0;
    inventory = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
    conditions = [];

    updateExp(exp) {
        this.exp = exp;
        this.currentNextLvl += exp;
        this.expPercent = this.currentNextLvl / this.nextLvl;
        if (this.currentNextLvl >= this.nextLvl) {
            this.level++;
            this.nextLvl *= (this.level / 3);
            this.currentNextLvl = 0;
            this.expPercent = (this.nextLvl - exp) / this.nextLvl;
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

    updateLife() {
        this.current.life += ~~(this.base.life * 0.25);
        if (this.current.life >= this.base.life) {
            this.current.life = ~~((this.base.life + ((this.vitality || 1) *
                (12 + (this.level * 0.6)))));
        }
        this.base.life = ~~((this.base.life + ((this.vitality || 1) *
            (12 + (this.level * 0.6)))));
    }

    updateMana() {
        this.current.mana += ~~(this.base.mana * 0.25);
        if (this.current.mana >= this.base.mana) {
            this.current.mana = ~~((this.base.mana + ((this.intelligence || 1) *
                (7 + (this.level * 0.6)))));
        }
        this.base.mana = ~~((this.base.mana + ((this.intelligence || 1) *
            (7 + (this.level * 0.6)))));
    }

    updateVitality() {
        // atk
        this.base.atk = ~~((this.base.atk + ((this.vitality || 1) * (this.level / 0.6))));
        this.current.atk = ~~((this.current.atk + ((this.vitality || 1) * (this.level / 0.6))));

        // def
        this.base.def = ~~((this.base.def + ((this.vitality || 1) * (this.level / 0.9))));
        this.current.def = ~~((this.current.def + ((this.vitality || 1) * (this.level / 0.9))));
    }

    updateIntelligence() {
        // magic
        this.base.magic = ~~((this.base.magic + ((this.intelligence || 1) * (this.level / 0.8))));
        this.current.magic = ~~((this.base.magic + ((this.intelligence || 1) * (this.level / 0.8))));

        // prot
        this.base.prot = ~~((this.base.prot + ((this.intelligence || 1) * (this.level / 0.9))));
        this.current.prot = ~~((this.base.prot + ((this.intelligence || 1) * (this.level / 0.9))));
    }

    updateAgility() {
        // vel
        this.base.vel = ~~((this.base.vel + ((this.agility || 1) *
            (2 + (this.level / 0.7)))));
        this.current.vel = ~~((this.current.vel + ((this.agility || 1) *
            (2 + (this.level / 0.7)))));

        // crit
        this.base.crit = ~~(this.base.crit + ((this.agility || 1) * (this.level * 0.3)));
        this.current.crit = ~~(this.current.crit + ((this.agility || 1) * (this.level * 0.3)));

        // eva
        this.base.eva = ~~(this.base.eva + ((this.agility || 1) * (this.level * 0.2)));
        this.current.eva = ~~(this.current.eva + ((this.agility || 1) * (this.level * 0.2)));
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
}
