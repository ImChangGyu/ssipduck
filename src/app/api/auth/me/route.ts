import { NextResponse } from 'next/server';
import { createClient } from '~/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ user: null, profile: null });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, nickname')
    .eq('id', user.id)
    .single();

  return NextResponse.json({ user, profile: profile ?? null });
}
