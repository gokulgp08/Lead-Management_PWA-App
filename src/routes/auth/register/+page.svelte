<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';

  export let form;
</script>

<svelte:head>
  <title>Register Company</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
  <div class="max-w-md w-full p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Register Your Company</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Create a new account and start managing your leads.</p>
    </div>

    <form method="POST" use:enhance class="space-y-6">
      <div>
        <Label for="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          type="text"
          required
          placeholder="Your Company Inc."
          value={form?.data?.companyName ?? ''}
        />
        {#if form?.errors?.companyName}
          <p class="text-sm text-red-500 mt-1">{form.errors.companyName[0]}</p>
        {/if}
      </div>

      <div>
        <Label for="name">Your Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          placeholder="John Doe"
          value={form?.data?.name ?? ''}
        />
        {#if form?.errors?.name}
          <p class="text-sm text-red-500 mt-1">{form.errors.name[0]}</p>
        {/if}
      </div>

      <div>
        <Label for="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
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
          placeholder="••••••••"
        />
        {#if form?.errors?.password}
          <p class="text-sm text-red-500 mt-1">{form.errors.password[0]}</p>
        {/if}
      </div>

      <Button type="submit" class="w-full">Register</Button>

      {#if form?.error}
        <p class="text-sm text-red-500 text-center">{form.error}</p>
      {/if}
    </form>

    <div class="text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Already have an account? 
        <a href="/auth/login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">
          Sign in
        </a>
      </p>
    </div>
  </div>
</div>
