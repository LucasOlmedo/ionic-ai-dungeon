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
        crit: 10,
        eva: 10,
    };

    getLife() {
        return this.attributes.life;
    }

    getMana() {
        return this.attributes.mana;
    }
}
