export interface Awards  {
  tournament: string,
  gold: number,
  silver: number,
  bronze: number
}

export interface Modalidade {
  name: string;
  instagram: string;
  icon: string;
  description: string;
  awards: Awards[];
}

export interface TournamentModality {
  gold: number
  silver: number
  bronze: number
  tournament: Tournament
}

interface Tournament {
  name: string
}
