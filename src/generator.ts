// @ts-ignore
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 6 });

const randomPlayer = (array: Player[], except: string[]) => {
    let player: Player;

    do {
        player = array[Math.floor(Math.random() * array.length)];
        if (array.length === except.length) throw new Error('The player has no target players');
    } while (except.includes(player.fullName));
    return player;
};

export class Generator {
    private readonly _players: Player[];

    constructor(...players: Player[]) {
        this._players = players.map(player => {
            player.password ||= uid.randomUUID().toLowerCase();
            player.exceptionNames ??= [];

            return player;
        });
    }

    addPlayer(player: Player): number {
        (<Player>player).password ??= uid.randomUUID().toLowerCase();
        (<Player>player).exceptionNames ??= [];

        return this._players.push(<Player>player);
    }

    dropPlayer(playerName: string): void {
        const index = this._players.findIndex(model => model.fullName === playerName);

        this._players.splice(index, 1);
    }

    addException(playerName: string, targetPlayerName: string): void {
        const player = this._players.find(model => model.fullName === playerName);

        player?.exceptionNames.push(targetPlayerName);
    }

    dropException(playerName: string, targetPlayerName: string) {
        const player = this._players.find(model => model.fullName === playerName);
        const index = player?.exceptionNames.indexOf(targetPlayerName);

        if (!player || index === undefined || index < 0) return;

        player.exceptionNames.splice(index, 1);
    }

    static updatePlayers(players: Player[]): Player[] {
        return players.map(player => {
            const targetPlayer = <Player>players.find(p => p.fullName === player.targetPlayerName);
            player.targetWish = targetPlayer.givesWish;
            return player;
        });
    }

    /**
     * @return [player, targetPlayer][]
     */
    getGameResult(): Player[] {
        try {
            const participants: Player[] = [];
            const distributed: string[] = [];

            this._players.sort((p1, p2) => p2.exceptionNames.length - p1.exceptionNames.length);

            for (let i = 0; i < this._players.length; i++) {
                const player = this._players[i];
                const targetPlayer = randomPlayer(
                    this._players,
                    [player.fullName, ...distributed, ...player.exceptionNames].filter(
                        (item, index, array) => array.indexOf(item) === index
                    )
                );
                distributed.push(targetPlayer.fullName);

                player.targetPlayerName = targetPlayer.fullName;
                player.targetWish = targetPlayer.givesWish;
                participants.push(player);
            }

            return participants;
        } catch (e) {
            return this.getGameResult();
        }
    }

    get players(): Player[] {
        return this._players;
    }
}
export interface Player {
    fullName: string;
    givesWish: string;
    exceptionNames: string[];
    password: string;
    id: number;
    targetWish: string;
    targetPlayerName: string;
}
