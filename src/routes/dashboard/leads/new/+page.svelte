<script lang="ts">
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';
  import * as Card from '$lib/components/ui/card';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import * as Select from '$lib/components/ui/select';
  
  import Button from '$lib/components/ui/Button.svelte';

  export let data: PageData;

  const { form, errors, enhance } = superForm(data.form);
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
            <Select.Root name="status">
              <Select.Trigger class="w-full" bind:value={$form.status}>
                <Select.Value placeholder="Select a status" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="new">New</Select.Item>
                <Select.Item value="contacted">Contacted</Select.Item>
                <Select.Item value="qualified">Qualified</Select.Item>
                <Select.Item value="converted">Converted</Select.Item>
                <Select.Item value="lost">Lost</Select.Item>
              </Select.Content>
            </Select.Root>
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
