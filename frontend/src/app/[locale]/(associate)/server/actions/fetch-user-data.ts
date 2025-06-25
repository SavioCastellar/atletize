import { supabase } from "@/app/api/auth/supabase/client";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export async function fetchUserData(session: Session) {
    const { data: userData, error } = await supabase
        .from('users')
        .select(`
            id,
            name,
            enrollment_code,
            course,
            photo_url,
            plan,
            subscriptions (
                plan,
                end_date
            )
        `)
        .eq('id', session?.user?.id!)
        .single()

    if (error || userData.plan === 'user') {
        redirect('/socios')
    }

    return userData
}