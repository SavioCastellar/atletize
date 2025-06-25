import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "../utils/supabase-browser";

function fetchAthletes() {
  const supabase = useSupabaseBrowser()

  return supabase
    .from('athletes')
    .select(`
      id,
      name,
      image,
      course,
      graduation,
      description,
      instagram,
      athletes_modalities (
        modality_id
      )
    `)
    .order('name', { ascending: true })
}

export function getAthletes() {
  const { data: athletesData, isLoading: athletesLoading, isError: athletesError } = useQuery(fetchAthletes())

  const athletes = athletesData?.map((athlete: any) => {
    return {
      id: athlete.id,
      name: athlete.name,
      image: athlete.image,
      course: athlete.course,
      graduation: athlete.graduation,
      description: athlete.description,
      instagram: athlete.instagram,
      modalities: athlete.athletes_modalities.map((modality: any) => modality.modality_id)
    }
  })

  return {
    data: athletes,
    loading: athletesLoading,
    error: athletesError
  }
}

