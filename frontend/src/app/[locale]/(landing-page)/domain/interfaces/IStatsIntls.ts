interface Stat {
  id: string;
  title: string;
  value: string;
}

export interface IStatsIntl {
  headerTitle: string;
  title: string;
  subtitle: string;
  stats: Stat[];
}
