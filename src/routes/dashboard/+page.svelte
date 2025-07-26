<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import { PlusCircle, Pencil, Trash2 } from 'lucide-svelte';
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import * as Table from '$lib/components/ui/table';

  export let data: PageData;
</script>

<div class="container mx-auto py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Dashboard</h1>
    <Button href="/dashboard/leads/new">
      <PlusCircle class="mr-2 h-4 w-4" />
      Add New Lead
    </Button>
  </div>

  <div class="bg-card p-6 rounded-lg shadow-md mb-8">
    <h2 class="text-xl font-semibold mb-4">Welcome, {data.user?.name}!</h2>
    <p class="text-muted-foreground">
      You are logged into the dashboard for <strong>{data.company?.name}</strong>.
    </p>
    <p class="text-muted-foreground mt-2">
      This is your central hub for managing leads. You can add, view, edit, and delete leads from here.
    </p>
  </div>

  <div class="bg-card p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Your Leads</h2>
    {#if data.leads && data.leads.length > 0}
      <Table.Root>
        <Table.Caption>A list of your recent leads.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Lead Name</Table.Head>
            <Table.Head>Company Name</Table.Head>
            <Table.Head>Mobile</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head class="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each data.leads as lead}
            <Table.Row>
              <Table.Cell>{lead.lead_name}</Table.Cell>
              <Table.Cell>{lead.company_name}</Table.Cell>
              <Table.Cell>{(lead.mobile_numbers && lead.mobile_numbers[0]) || 'N/A'}</Table.Cell>
              <Table.Cell><span class="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">{lead.status}</span></Table.Cell>
              <Table.Cell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button variant="outline" size="icon" href={`/dashboard/leads/${lead.id}/edit`}>
                    <Pencil class="h-4 w-4" />
                  </Button>
                  <form method="POST" action="?/delete" use:enhance>
                    <input type="hidden" name="id" value={lead.id} />
                    <Button variant="destructive" size="icon" type="submit">
                      <Trash2 class="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    {:else}
      <div class="text-center py-8">
        <p class="text-muted-foreground">No leads found.</p>

      </div>
    {/if}
  </div>
</div>
