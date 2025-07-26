<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';

  export let form;
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
  <div class="max-w-md w-full p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Sign in to continue to your dashboard.</p>
    </div>

    {#if $page.url.searchParams.get('registered')}
      <div class="p-4 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-md">
        Registration successful! Please log in to continue.
      </div>
    {/if}

    <form method="POST" use:enhance class="space-y-6">
      <div>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          value={form?.data?.email ?? ''}
        />
        {#if form?.errors?.email}
          <p class="text-sm text-red-500 mt-1">{form.errors.email[0]}</p>
        {/if}
      </div>

      <div>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
        />
        {#if form?.errors?.password}
          <p class="text-sm text-red-500 mt-1">{form.errors.password[0]}</p>
        {/if}
      </div>

      {#if form?.error}
        <p class="text-sm text-red-500 mt-1">{form.error}</p>
      {/if}

      <Button type="submit" class="w-full">Login</Button>
    </form>

    <p class="text-center text-sm text-gray-600 dark:text-gray-400">
      Don't have an account? <a href="/auth/register" class="font-medium text-blue-600 hover:underline">Register here</a>.
    </p>
  </div>
</div>
