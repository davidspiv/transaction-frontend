<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import EntryCard from '@/components/EntryCard.vue';
</script>

<template>
  <div class="wrapper">
    <header>
      <nav>
        <RouterLink to="/receipts">Receipts</RouterLink>
        <RouterLink to="/journal">Journal</RouterLink>
        <RouterLink to="/ledger">Ledger</RouterLink>
        <RouterLink to="/reports">Reports</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>

  <EntryCard :selectedReceipt="null"></EntryCard>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 25rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
