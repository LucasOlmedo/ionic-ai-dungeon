export class Player {
    name: string;
    level: number = 1;
    exp: number = 0;
    nextLvl: number = 100;
    vitality: number = 0;
    intelligence: number = 0;
    agility: number = 0;
    inventory = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    attributes = {
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

    getBonusLvl() {
        let bonusLvl = 1;
        for (let index = 0; index < this.level; index++) {
            bonusLvl += 0.05;
        }
        return bonusLvl;
    }

    getLife() {
        return Math.floor((this.attributes.life + (this.vitality *
            (50 + (this.level * 1.5)))));
    }

    getAtk() {
        return Math.floor((this.attributes.atk + (this.vitality *
            (10 + (this.level * 0.5)))));
    }

    getDef() {
        return Math.floor((this.attributes.def + (this.vitality *
            (10 + (this.level * 0.2)))));
    }

    getMana() {
        return Math.floor((this.attributes.mana + (this.intelligence *
            (50 + (this.level * 1.5)))));
    }

    getMagic() {
        return Math.floor((this.attributes.magic + (this.intelligence *
            (10 + (this.level * 0.5)))));
    }

    getProt() {
        return Math.floor((this.attributes.prot + (this.intelligence *
            (10 + (this.level * 0.2)))));
    }

    getVel() {
        return Math.floor((this.attributes.vel + (this.agility *
            (10 + (this.level * 0.5)))));
    }

    getCrit() {
        return Math.floor(this.attributes.crit + (this.agility * 0.2));
    }

    getEva() {
        return Math.floor(this.attributes.eva + (this.agility * 0.1));
    }
}
