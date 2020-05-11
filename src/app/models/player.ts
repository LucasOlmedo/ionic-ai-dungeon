export class Player {
    name: string;
    level: number = 1;
    exp: number = 0;
    nextLvl: number = 100;
    vitality: number = 0;
    intelligence: number = 0;
    agility: number = 0;
    attributes = {
        life: 100,
        atk: 10,
        def: 10,
        magic: 10,
        mana: 100,
        prot: 10,
        vel: 10,
        crit: 5,
        eva: 5,
    };

    getBonusLvl() {
        let bonusLvl = 1;
        for (let index = 0; index < this.level; index++) {
            bonusLvl += 0.05;
        }
        return bonusLvl;
    }

    getLife() {
        return Math.floor((this.attributes.life + (this.vitality * 10))
            * this.getBonusLvl());
    }

    getAtk() {
        return Math.floor((this.attributes.atk + (this.vitality * 1.5))
            * this.getBonusLvl());
    }

    getDef() {
        return Math.floor((this.attributes.def + (this.vitality * 1.5))
            * this.getBonusLvl());
    }

    getMagic() {
        return Math.floor((this.attributes.magic + (this.intelligence * 1.5))
            * this.getBonusLvl());
    }

    getMana() {
        return Math.floor((this.attributes.mana + (this.intelligence * 10))
            * this.getBonusLvl());
    }

    getProt() {
        return Math.floor((this.attributes.prot + (this.intelligence * 1.5))
            * this.getBonusLvl());
    }

    getVel() {
        return Math.floor((this.attributes.vel + (this.agility * 2))
            * this.getBonusLvl());
    }

    getCrit() {
        return Math.floor((this.attributes.crit + (this.agility * 1.5))
            * this.getBonusLvl());
    }

    getEva() {
        return Math.floor((this.attributes.eva + (this.agility * 1.5))
            * this.getBonusLvl());
    }
}
