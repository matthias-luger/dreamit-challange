import gql from 'graphql-tag'

export const GET_DRAWS = gql`
    query getDraws($date: String!, $limit: Int!, $type: String!) {
        draw(date: $date, limit: $limit, type: $type) {
            backendError
            draws {
                additionalNumbers
                date
                gameAmount
                jackpot
                megaPlier
                numbers
                odds {
                    link
                    numberOfWinners
                    numbers
                    odd
                    winningClass
                    withOptions
                }
                powerPlay
                shares
                time
            }
            success
        }
    }
`

export interface GetDrawsResponse {
    draw: {
        backendError: string
        draws: Draw[]
        success: boolean
    }
}

export enum GameType {
    Cash4Life = 'cash4life',
    ElGordo = 'elgordo',
    ElNino = 'elnino',
    EuroJackpot = 'eurojackpot',
    EuroMillions = 'euromillions',
    Gluecksspirale = 'gluecksspirale',
    GluecksspiraleJahresrente = 'gluecksspirale_jahresrente',
    HalloweenLotterie = 'halloweenlotterie',
    Keno = 'keno',
    Lotto = 'lotto',
    Lotto6aus45 = 'lotto6aus45',
    Lotto6aus45Joker = 'lotto6aus45_joker',
    LottoPlus = 'lottoplus',
    MegaMillions = 'megamillions',
    MiniLos = 'minilos',
    MiniLotto = 'minilotto',
    OsterLotterie = 'osterlotterie',
    PowerBall = 'powerball',
    SiegerChance = 'siegerchance',
    SilvesterMillionen = 'silvestermillionen',
    SommerLotterie = 'sommerlotterie',
    SonntagsLotto = 'sonntagslotto',
    Spiel77 = 'spiel77',
    Super6 = 'super6',
    SuperLotto = 'superlotto',
    SwissLotto = 'swisslotto',
    SwissLottoJoker = 'swisslotto_joker',
    WeihnachtsLotterie = 'weihnachtslotterie',
    WorldMillions = 'worldmillions'
}

export type GetDrawsQueryVariables = {
    date: string
    limit: number
    type: GameType
}

export type DrawOdds = {
    link: string
    numberOfWinners: number
    numbers: string[]
    odd: number
    winningClass: number
    withOptions: string[]
}

export interface Draw {
    additionalNumbers: string[]
    date: string
    gameAmount: number
    jackpot: number
    megaPlier: string
    numbers: string[]
    odds: DrawOdds[]
    powerPlay: string
    shares: string[]
    time: string
}
