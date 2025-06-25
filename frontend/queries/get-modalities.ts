import { TypedSupabaseClient } from "../utils/types";

export function getModalities(client: TypedSupabaseClient) {
  return client
    .from('modalities')
    .select(
      `
      id,
      name,
      description,
      icon,
      instagram,
      status
      `
    )
    .order('name', { ascending: true })
}

export function getModalitiesByUserId(client: TypedSupabaseClient, id: string) {
  return client
    .from('athletes_modalities')
    .select('modalities(*)')
    .eq('athlete_id', id)
    // .order('modalities.name', { ascending: true })
}
