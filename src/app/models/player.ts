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
    inBattle: boolean = false;
    inventory: any = [
        {
            id: 1,
            type: 'potion',
            equiped: false,
            img: '../assets/images/equip/loot/life-potion.png',
            name: 'Poção de cura',
            count: 3,
            attr: 'life',
            value: 20,
            cost: 50,
            skill: null,
        },
        {
            id: 2,
            type: 'potion',
            equiped: false,
            img: '../assets/images/equip/loot/mana-potion.png',
            name: 'Poção de mana',
            count: 3,
            attr: 'mana',
            value: 20,
            cost: 50,
            skill: null,
        },
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0,
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
        vel: 5,
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
        vel: 5,
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
            name: 'Ataque básico',
            img: '../assets/images/skill/hand-atk.png',
            color: 'skillGray',
            active: true,
            val: 35,
            cost: 0,
            type: 'atk',
            attr: 'atk',
            equip: 'sword',
            desc: 'Usa o próprio corpo como arma para atacar os inimigos',
        },
        null,
        null,
        null,
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
            this.nextLvl = (this.nextLvl / 0.7);
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
        this.equipAttr = {
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
        this.currentLife += ~~(this.baseLife * 0.065);
        if (this.currentLife >= this.baseLife) {
            this.currentLife = ~~((this.baseLife + ((this.vitality || 1) *
                (3 + (this.level * 0.2)))));
        }
        this.baseLife = ~~((this.baseLife + ((this.vitality || 1) *
            (3 + (this.level * 0.2)))));
    }

    updateMana() {
        this.currentMana += ~~(this.baseMana * 0.065);
        if (this.currentMana >= this.baseMana) {
            this.currentMana = ~~((this.baseMana + ((this.intelligence || 1) *
                (1.65 + (this.level * 0.1)))));
        }
        this.baseMana = ~~((this.baseMana + ((this.intelligence || 1) *
            (1.65 + (this.level * 0.1)))));
    }

    updateVitality() {
        // atk
        this.base.atk = ~~((8 + ((this.vitality || 1) * (this.level / 0.4))));
        this.current.atk = ~~((8 + ((this.vitality || 1) * (this.level / 0.4))));
        // def
        this.base.def = ~~((4 + ((this.vitality || 1) * (this.level / 0.6))));
        this.current.def = ~~((4 + ((this.vitality || 1) * (this.level / 0.6))));
    }

    updateIntelligence() {
        // magic
        this.base.magic = ~~((7 + ((this.intelligence || 1) * (this.level / 0.3))));
        this.current.magic = ~~((7 + ((this.intelligence || 1) * (this.level / 0.3))));
        // prot
        this.base.prot = ~~((4 + ((this.intelligence || 1) * (this.level / 0.9))));
        this.current.prot = ~~((4 + ((this.intelligence || 1) * (this.level / 0.9))));
    }

    updateAgility() {
        // vel
        this.base.vel = ~~((this.base.vel + ((this.agility || 1) * (this.level / 0.95))));
        this.current.vel = ~~((this.current.vel + ((this.agility || 1) * (this.level / 0.95))));
        // crit
        this.base.crit = Math.ceil(1.35 + ((this.agility || 1) * (this.level * 0.15)));
        this.current.crit = Math.ceil(1.35 + ((this.agility || 1) * (this.level * 0.15)));
        // eva
        this.base.eva = Math.ceil(0.5 + ((this.agility || 1) * (this.level * 0.1)));
        this.current.eva = Math.ceil(0.5 + ((this.agility || 1) * (this.level * 0.1)));
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

    removeEquipSkill(equip) {
        this.skills = this.skills.map(t => {
            if (t != null && equip.skill != null && equip.skill.name == t.name) {
                return null;
            }
            return t;
        });

        if (this.skills[0] == null) {
            this.skills[0] = {
                name: 'Ataque básico',
                img: '../assets/images/skill/hand-atk.png',
                color: 'skillGray',
                active: true,
                val: 30,
                cost: 0,
                type: 'atk',
                attr: 'atk',
                equip: 'sword',
                desc: '',
            };
        }
    }
}
