<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import * as Select from '$lib/components/ui/select';
  import { Textarea } from '$lib/components/ui/textarea';

  export let data;

  const { form, errors } = superForm(data.form);

  const leadStatusOptions = ['new', 'contacted', 'qualified', 'lost'];
</script>

<svelte:head>
  <title>Edit Lead: {$form.name}</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <header class="bg-white shadow-sm dark:bg-gray-800">
    <div class="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Edit Lead</h1>
        <Button href="/dashboard" variant="outline">Back to Dashboard</Button>
      </div>
    </div>
  </header>

  <main class="py-10">
    <div class="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <div class="p-8 bg-white shadow dark:bg-gray-800 sm:rounded-lg">
        <form method="POST" use:enhance class="space-y-6">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label for="name">Full Name</Label>
              <Input id="name" name="name" required bind:value={$form.name} />
              {#if $errors.name}
                <p class="mt-1 text-sm text-red-500">{$errors.name[0]}</p>
              {/if}
            </div>
            <div>
              <Label for="email">Email Address</Label>
              <Input id="email" name="email" type="email" required bind:value={$form.email} />
              {#if $errors.email}
                <p class="mt-1 text-sm text-red-500">{$errors.email[0]}</p>
              {/if}
            </div>
            <div>
              <Label for="phone">Phone Number (Optional)</Label>
              <Input id="phone" name="phone" bind:value={$form.phone} />
            </div>
            <div>
              <Label for="status">Status</Label>
              <Select.Root name="status">
                <Select.Trigger class="w-full" bind:value={$form.status}>
                  <Select.Value placeholder="Select status" />
                </Select.Trigger>
                <Select.Content>
                  {#each leadStatusOptions as status}
                    <Select.Item value={status}>{status}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>
            </div>
            <div class="md:col-span-2">
              <Label for="assigned_to">Assign To (Optional)</Label>
              <Select.Root name="assigned_to">
                <Select.Trigger class="w-full" bind:value={$form.assigned_to}>
                  <Select.Value placeholder="Select a team member" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="">Unassigned</Select.Item>
                  {#each data.users as user}
                    <Select.Item value={user.id}>{user.name}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>
            </div>
            <div class="md:col-span-2">
              <Label for="notes">Notes (Optional)</Label>
              <Textarea id="notes" name="notes" rows={4} bind:value={$form.notes} />
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <Button href="/dashboard" variant="outline">Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  </main>
</div>
