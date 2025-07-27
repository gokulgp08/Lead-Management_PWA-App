<script lang="ts">
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';
  import * as Card from '$lib/components/ui/card';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import { cn } from '$lib/utils';
  
  import Button from '$lib/components/ui/Button.svelte';

  export let data: PageData;

  const { form, errors, enhance } = superForm(data.form);
  
  // Define status options
  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'converted', label: 'Converted' },
    { value: 'lost', label: 'Lost' }
  ];
  
  // Handle status change
  function handleStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    $form.status = select.value;
  }
</script>

<div class="container mx-auto max-w-2xl py-8">
  <Card.Root>
    <Card.Header>
      <Card.Title>Add New Lead</Card.Title>
      <Card.Description>Fill out the form below to create a new lead.</Card.Description>
    </Card.Header>
    <Card.Content>
      <form method="POST" use:enhance>
        <div class="grid gap-6">
          <div class="grid gap-2">
            <Label for="lead_name">Lead Name</Label>
            <Input id="lead_name" name="lead_name" bind:value={$form.lead_name} />
            {#if $errors.lead_name}
              <span class="text-sm text-destructive">{$errors.lead_name}</span>
            {/if}
          </div>
          <div class="grid gap-2">
            <Label for="company_name">Company Name</Label>
            <Input id="company_name" name="company_name" bind:value={$form.company_name} />
            {#if $errors.company_name}
              <span class="text-sm text-destructive">{$errors.company_name}</span>
            {/if}
          </div>
          <div class="grid gap-2">
            <Label for="mobile_numbers">Mobile Number</Label>
            <Input id="mobile_numbers" name="mobile_numbers" bind:value={$form.mobile_numbers} />
            {#if $errors.mobile_numbers}
              <span class="text-sm text-destructive">{$errors.mobile_numbers}</span>
            {/if}
          </div>
          <div class="grid gap-2">
            <Label for="current_software">Current Software</Label>
            <Input id="current_software" name="current_software" bind:value={$form.current_software} />
            {#if $errors.current_software}
              <span class="text-sm text-destructive">{$errors.current_software}</span>
            {/if}
          </div>
          <div class="grid gap-2">
            <Label for="status">Status</Label>
            <select
              id="status"
              name="status"
              class={cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                'placeholder:text-muted-foreground',
                'sm:text-sm sm:leading-6',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
                $errors.status ? 'border-red-500' : ''
              )}
              bind:value={$form.status}
              on:change={handleStatusChange}
            >
              <option value="" disabled selected>Select a status</option>
              {#each statusOptions as option}
                <option value={option.value}>
                  {option.label}
                </option>
              {/each}
            </select>
            {#if $errors.status}
              <span class="text-sm text-destructive">{$errors.status}</span>
            {/if}
          </div>
          <div class="grid gap-2">
            <Label for="remarks">Remarks</Label>
            <Textarea id="remarks" name="remarks" bind:value={$form.remarks} />
            {#if $errors.remarks}
              <span class="text-sm text-destructive">{$errors.remarks}</span>
            {/if}
          </div>
          <Button type="submit">Create Lead</Button>
        </div>
      </form>
    </Card.Content>
  </Card.Root>
</div>
