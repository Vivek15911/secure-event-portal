import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting cleanup of expired tickets...');

    // Delete tickets that have expired (24 hours after booking date)
    const { data: expiredTickets, error: selectError } = await supabase
      .from('tickets')
      .select('id, ticket_number, expires_at')
      .lt('expires_at', new Date().toISOString());

    if (selectError) {
      console.error('Error fetching expired tickets:', selectError);
      throw selectError;
    }

    console.log(`Found ${expiredTickets?.length || 0} expired tickets`);

    if (expiredTickets && expiredTickets.length > 0) {
      const ticketIds = expiredTickets.map(t => t.id);
      
      const { error: deleteError } = await supabase
        .from('tickets')
        .delete()
        .in('id', ticketIds);

      if (deleteError) {
        console.error('Error deleting expired tickets:', deleteError);
        throw deleteError;
      }

      console.log(`Successfully deleted ${expiredTickets.length} expired tickets`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        deletedCount: expiredTickets?.length || 0,
        message: `Cleanup complete. Deleted ${expiredTickets?.length || 0} expired tickets.`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Error in cleanup-expired-tickets function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
