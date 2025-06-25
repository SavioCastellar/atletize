import { useMemo } from "react"
import useSupabaseBrowser from "../../../../utils/supabase-browser"

function useSupabase() {
  return useMemo(useSupabaseBrowser, [])
}

export default useSupabase
