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
            damage: 25,
            cost: 0,
        },
        {
            img: '../assets/images/skill/strike-shot.png',
            color: 'skillEmerald',
            active: true,
            damage: 30,
            cost: 10,
        },
        {
            img: '../assets/images/skill/shield-reflect.png',
            color: 'skillYellow',
            active: true,
            damage: 0,
            cost: 15,
        },
        {
            img: '../assets/images/skill/slash-claws.png',
            color: 'skillDarkred',
            active: true,
            damage: 45,
            cost: 20,
        },
    ];
    conditions = [];

    updateExp(exp) {
        this.exp = exp;
        this.currentNextLvl += exp;
        this.expPercent = this.currentNextLvl / this.nextLvl;
        if (this.currentNextLvl >= this.nextLvl) {
            this.level++;
            this.nextLvl *= (this.level / 2);
            this.currentNextLvl = 0;
            this.expPercent = 0;
            this.calcLevel();
        }
    }

    calcLevel() {
        // life
        this.updateLife();

        // mana
        this.updateMana();
    }

    updateLife() {
        this.current.life += ~~(this.base.life * 0.25);
        if (this.current.life >= this.base.life) {
            this.current.life = Math.floor((this.base.life + ((this.vitality || 1) *
                (25 + (this.level * 0.4)))));
        }
        this.base.life = Math.floor((this.base.life + ((this.vitality || 1) *
            (25 + (this.level * 0.4)))));
    }

    updateMana() {
        this.current.mana += ~~(this.base.mana * 0.25);
        if (this.current.mana >= this.base.mana) {
            this.current.mana = Math.floor((this.base.mana + ((this.intelligence || 1) *
                (10 + (this.level * 0.4)))));
        }
        this.base.mana = Math.floor((this.base.mana + ((this.intelligence || 1) *
            (10 + (this.level * 0.4)))));
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
