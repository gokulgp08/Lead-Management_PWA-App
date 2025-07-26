<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  onMount(() => {
    // Redirect to dashboard if already authenticated
    if ($page.data.user) {
      goto('/dashboard');
    }
  });
</script>

<svelte:head>
  <title>Lead Management System</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
  <div class="absolute top-4 right-4">
    <ThemeToggle />
  </div>
  
  <div class="container mx-auto px-4 py-16">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Lead Management
        <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          System
        </span>
      </h1>
      
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        Streamline your lead management process with our powerful multi-tenant platform. 
        Collaborate with your team and grow your business efficiently.
      </p>

      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="p-8">
          <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            New Company?
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Start your journey by registering your company and setting up your team.
          </p>
          <Button href="/auth/register" size="lg" className="w-full">
            Register Company
          </Button>
        </Card>

        <Card className="p-8">
          <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Existing User?
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Sign in to access your dashboard and manage your leads.
          </p>
          <Button href="/auth/login" variant="outline" size="lg" className="w-full">
            Sign In
          </Button>
        </Card>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Team Collaboration</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">Work together with your team members seamlessly</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Advanced Analytics</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">Track your lead conversion and team performance</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Secure & Private</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">Your data is isolated and protected with enterprise-grade security</p>
        </div>
      </div>
    </div>
  </div>
</div>